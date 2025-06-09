# LCloudflare tunnel

## Locally managed tunnel
From [cloudflare](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/do-more-with-tunnels/local-management/create-local-tunnel/)


### Tunnel registration
On other computer install clouflared tunnel, create a cert.pem for the domain name with `cloudflared tunnel login` and a .json for the tunnel creation `cloudflared tunnel create <NAME>`

### Tunnel routing config
Create file config.yaml like:

    tunnel: <NAME>
    credentials-file: /etc/cloudflared/XXXXXXXXXXX.json

    ingress:
    - hostname: example.com
        service: https://traefik:443
        originRequest:
        originServerName: example.com
    - hostname: smtp.example.com
        service: tcp://traefik:25
        originRequest:
        originServerName: example.com
    - hostname: submission.example.com
        service: tcp://traefik:587
        originRequest:
        originServerName: example.com
    - hostname: submissions.example.com
        service: tcp://traefik:465
        originRequest:
        originServerName: example.com
    - hostname: imap.example.com
        service: tcp://traefik:143
        originRequest:
        originServerName: example.com
    - hostname: imaps.example.com
        service: tcp://traefik:993
        originRequest:
        originServerName: example.com
    - hostname: pop3.example.com
        service: tcp://traefik:110
        originRequest:
        originServerName: example.com
    - hostname: pop3s.example.com
        service: tcp://traefik:995
        originRequest:
        originServerName: example.com
    - hostname: managesieve.example.com
        service: tcp://traefik:4190
        originRequest:
        originServerName: example.com
    - hostname: "*.example.com"
        service: https://traefik:443
        originRequest:
        originServerName: example.com
    - service: http_status:404

### Docker compose
    services:
        cloudflare-tunnel:
            restart: unless-stopped
            image: docker.io/cloudflare/cloudflared:2025.5.0
            container_name: cloudflare-tunnel
            hostname: ${<NAME>}-cloudflare-tunnel
            labels:
            diun.enable: true
            diun.watch_repos: true
            command: tunnel --no-autoupdate run
            volumes:
            - /${DOCKER_DATA_DIRECTORY:-Volume Path Required}/docker/docker-data/${<NAME>:-Name Path Required}/cloudflared/:/etc/cloudflared