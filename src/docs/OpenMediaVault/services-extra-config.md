# Services extra config
from [OpenMediavault - Custom Configuration](https://docs.openmediavault.org/en/7.x/various/advset.html)

## Get vars
List all available extra vars: `omv-env list`
List all set extra vars: `omv-env get`
Get a specific extra var: `omv-env get <VARIABLE_NAME>`

# Set vars
Set a specific extra var: `omv-env set <VARIABLE_NAME> <VALUE>`

apply the changes:
```bash
monit restart omv-engined
omv-salt stage run prepare
omv-salt stage run deploy
```
