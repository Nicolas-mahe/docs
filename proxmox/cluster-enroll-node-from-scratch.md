# Init a nodes from scrath

## Install OS
Boot drive 240GB as EXT4:
- 40GiB Swap
- 15GB / "root"

After install go on shell and :
- if it's portable computer, disable extinction when capot is close: `systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target`
- from a distant host : add a public ssh key for root with `ssh-copy-id -i ~/.ssh/id_rsa root@<NODE-IP>`
- run [init-script](https://tteck.github.io/Proxmox/#proxmox-ve-post-install) `bash -c "$(wget -qLO - https://github.com/tteck/Proxmox/raw/main/misc/post-pve-install.sh)"` with all at *YES* **except HA** part

Reboot node if needed

## Join cluster
- Go on web interface of an active node of cluster, on cluster section under *Datacenter* menu: click on *Join information* and copy it.
- in the same menu on the new node, click on *Join cluster* and past information, fill root password of cluster and select the network adapter for the communication
- Wait 1 minute and refesh web page