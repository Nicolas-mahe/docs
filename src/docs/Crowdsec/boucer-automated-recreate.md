In case of link lost, add the command in crontab:

```bash
docker exec crowdsec cscli bouncers remove TRAEFIK && docker exec crowdsec cscli bouncers add TRAEFIK --key {$API_KEY} $ && docker restart traefik crowdsec && sleep 15 && docker exec crowdsec cscli bouncers list
```