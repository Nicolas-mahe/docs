# Flash Messages Design

## Description

Fait apparaitre un message flash en haut à droite de l'écran pendant trois secondes. Ce message peut être fermé manuellement plus tôt en cliquant sur la croix à droite.

## Positionnement des messages

Dans nos apps Flask ce message sera tout en haut de la section body du html. La meilleurs pratique reste de le mettre dans le fichier **`base.html`** pour ne pas avoir à le répliquer à toutes les pages html.

### base.html
```html
<div id="flash-container" class="flash-container">
        {% with messages = get_flashed_messages(with_categories=true) %}
            {% if messages %}
                {% for category, message in messages %}
                    <div class="flash-toast flash-{{ category }}">
                        <i class="fas {% if category == 'success' %}fa-check-circle{% else %}fa-exclamation-triangle{% endif %}"></i>
                        <span>{{ message }}</span>
                        <button class="flash-close" onclick="this.parentElement.remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                {% endfor %}
            {% endif %}
        {% endwith %}
    </div>
```

Ce bout de code contient les class css nécessaire à son utilisation et l'appel de la fonction javascript permettant la fermeture du message flash.
Le fonctionnement est un ensemble et n'aura pas l'effet désiré si tout les éléments ne sont pas présent.

## style.css
```css
:root {
    --bg-secondary: #e0e0e0;
    --text-light: #f8f9fa;
    --success: #28a745;
    --warning: #ffc107;
    --error: #dc3545;
    --informations: #17a2b8;
}

@keyframes slideInRight {
    0% {
        transform: translateX(100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    0% {
        transform: translateX(0);
        opacity: 1;
    }
    100% {
        transform: translateX(100%);
        opacity: 0;
    }
}

.flash-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    max-width: 400px;
    pointer-events: none;
}

.flash-toast {
    background: rgba(31, 42, 60, 0.95);
    border-radius: 12px;
    padding: 1rem 1.5rem;
    margin-bottom: 0.75rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    pointer-events: auto;
    animation: slideInRight 0.3s ease-out;
    transition: all 0.3s ease;
    min-width: 300px;
}

.flash-toast:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

.flash-success {
    border-color: var(--success);
    color: var(--success);
}

.flash-success i {
    color: var(--success);
}

.flash-error {
    border-color: var(--error);
    color: var(--error);
}

.flash-error i {
    color: var(--error);
}

.flash-toast span {
    flex: 1;
    font-weight: 500;
    font-size: 0.9rem;
}

.flash-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    opacity: 0.7;
}

.flash-close:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-light);
    opacity: 1;
}
```

Les variables de couleurs dans **`:root`** sont essentiellent pour une bonne gestions des couleurs et éviter de les répliquer dans chaque class.

## main.js
```javascript
document.addEventListener('DOMContentLoaded', function() {

    // Flash messages
    const flashToasts = document.querySelectorAll('.flash-toast');
    flashToasts.forEach(function(toast) {
        setTimeout(function() {
            toast.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    });

});
```

Le javascript permet d'afficher le message avec un effet de slide et il disparrait ainsi au bout de 3 secondes.