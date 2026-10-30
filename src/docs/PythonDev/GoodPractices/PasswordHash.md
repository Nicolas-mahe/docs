# Hashage de mots de passe avec hashlib

## Vue d'ensemble

Implémentation d'un système de hashage sécurisé utilisant SHA-256 avec salt aléatoire pour protéger les mots de passe des utilisateurs.

## Génération et stockage du hash dans la base de donnée

```python
salt = os.urandom(32)
hash_object = hashlib.sha256()
hash_object.update(salt + password.encode('utf-8'))
hashed_password = salt + hash_object.digest()
user = User(email=email, password=hashed_password)
```

### Détails

- **`salt = os.urandom(32)`** : Génère un salt de 32 bytes
- **`hash_object = hashlib.sha256()`** : Initialise un objet pour calculer un hash SHA-256
- **`hash_object.update(salt + password.encode('utf-8'))`** : 
  - Convertit le mot de passe en bytes UTF-8
  - Concatène le salt avec le mot de passe
  - Ajoute cette combinaison au calcul du hash
- **`hashed_password = salt + hash_object.digest()`** : 
  - `digest()` retourne le hash calculé (32 bytes)
  - Concatène le salt original avec le hash
  - Résultat : 64 bytes total (32 salt + 32 hash)
- **`user = User(email=email, password=hashed_password)`** : Stocke le hash contenant le salt personnalisé en base

## Vérification d'un mot de passe fournis (Login)

```python
stored_salt = user.password[:32]
stored_hash = user.password[32:]
hash_object = hashlib.sha256()
hash_object.update(stored_salt + password.encode('utf-8'))
if hash_object.digest() == stored_hash:
    session['user_id'] = user.id
```

### Explication ligne par ligne

- **`stored_salt = user.password[:32]`** : Extrait le salt depuis les 32 premiers bytes du hash stocké
- **`stored_hash = user.password[32:]`** : Extrait le hash depuis les 32 derniers bytes
- **`hash_object = hashlib.sha256()`** : Crée un nouvel objet hash pour la vérification
- **`hash_object.update(stored_salt + password.encode('utf-8'))`** : 
  - Utilise le même salt que lors de l'inscription
  - Re-calcule le hash avec le mot de passe fourni
- **`if hash_object.digest() == stored_hash:`** : 
  - Compare le hash recalculé avec celui stocké
  - Si identique → mot de passe correct on initialise la session utilisateur
  - Si différent → mot de passe incorrect

## Structure des données

### Format de stockage
```code
user.password = [salt_32_bytes][hash_32_bytes]
|←-- 32 bytes --→|←-- 32 bytes --→|
|←-------- 64 bytes total -------→|
```

## Sécurité

- **Salt unique** : Chaque utilisateur a un salt différent, rendant les attaques par dictionnaire inefficaces
- **SHA-256** : Algorithme de hachage cryptographique robuste
- **Pas de réversibilité** : Impossible de retrouver le mot de passe original depuis le hash
- **Protection contre les collisions** : SHA-256 est résistant aux collisions