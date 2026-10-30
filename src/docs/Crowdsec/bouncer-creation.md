# Crowdsec Bouncer creation

## Traefik Bouncer
[plugin](https://plugins.traefik.io/plugins/6335346ca4caa9ddeffda116/crowdsec-bouncer-traefik-plugin)
[Crowdsec docker](https://github.com/crowdsecurity/crowdsec/tree/master/docker)

On first run or first run an new server, even if you copy volumes data: it's needed to delete the previous bouncer and recreate one to inititate a new api-token

*Bouncer name is set in environnement vars like BOUNCER_KEY_\<bouncer-name>*

- Enter in the container: `docker exec -it crowdsec bash` 
- List the declare bouncer: `cscli bouncer list`
- Delete the previous bouncer `cscli bouncer remove <bouncer-name>`
- Recreate it: `cscli bouncer add <bouncer-name>* --key <api-token(can be the same a previous be it's recommended to change it)>`
- Exit container's CLI: `exit`
- Restart both container: `docker restart crowdsec traefik`