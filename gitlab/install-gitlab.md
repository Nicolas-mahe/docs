# Install GitLab
follow (gitlab intall page)[https://about.gitlab.com/install/#debian]

`apt install sudo -y && sudo apt-get update && sudo apt-get install -y curl openssh-server ca-certificates perl`

`curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh | sudo bash`

`sudo EXTERNAL_URL="https://<DNSNAME>" apt-get install gitlab-ee`

## Mail configuration

## HTTPS Certs configuration

### Generate token

on (Cloudflare dashboard)[https://dash.cloudflare.com/profile/api-tokens]

-  "Create Token"

- Use template "Edit zone DNS"

    - Scopes:

        Zone → Zone → Read

        Zone → DNS → Edit

- Limit token to a specific zone

- **Don't loose it**

### HTTPS Certificate managment
#### Install certbot

`sudo apt install certbot python3-certbot-dns-cloudflare -y`

`sudo mkdir -p /root/.secrets/certbot/`

`sudo nano /root/.secrets/certbot/cloudflare.ini` with dns_cloudflare_api_token = *YOUR_API_TOKEN_FROM_ABOVE_STEP*

`sudo chmod 600 /root/.secrets/certbot/cloudflare.ini`

`sudo certbot certonly --dns-cloudflare --dns-cloudflare-credentials /root/.secrets/certbot/cloudflare.ini -d <DNSNAME>`

#### Renew managment
add a crontab: `sudo crontab -e` and fill with : *0 2 \* \* \* certbot renew --quiet --dns-cloudflare --dns-cloudflare-credentials /root/.secrets/certbot/cloudflare.ini && gitlab-ctl hup nginx*

## Configure Gitlab

### HTTPS Certs

in `/etc/gitlab/gitlab.rb` look for 
- *nginx['ssl_certificate']* & *nginx['ssl_certificate_key']* and file them with:
    - nginx['ssl_certificate'] = "/etc/letsencrypt/live/#{node['fqdn']}/fullchain.pem"
    - nginx['ssl_certificate_key'] = "/etc/letsencrypt/live/#{node['fqdn']}/privkey.pem"
- lab_rails['trusted_proxies'] and fill value with proxy IP/hostname

### Mail sender
in `/etc/gitlab/gitlab.rb` look for :

gitlab_rails['smtp_enable'] = true

gitlab_rails['smtp_address'] = "mail.\<MAILSERVER_PUBLIC_HOSTNAME>"

gitlab_rails['smtp_port'] = 465

gitlab_rails['smtp_user_name'] = "gitlab@\<MAILSERVER_PUBLIC_HOSTNAME>"

gitlab_rails['smtp_password'] = "YOUR PASSWORD"

gitlab_rails['smtp_domain'] = "\<MAILSERVER_PUBLIC_HOSTNAME>"

gitlab_rails['smtp_authentication'] = "login"

gitlab_rails['smtp_enable_starttls_auto'] = false

gitlab_rails['smtp_tls'] = true

gitlab_rails['smtp_pool'] = true


## Start GitLab

`sudo gitlab-ctl reconfigure` and connect to https://\<DNSNAME> with root and password from `sudo cat /etc/gitlab/initial_root_password` 

***Password will be deleted in 24h after installation, need to change and save it***