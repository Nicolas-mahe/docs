# Backup Management for GitLab docker

## Create Backup
source [gitlab's docs](https://docs.gitlab.com/18.2/administration/backup_restore/backup_gitlab)

Requirements:
- Gitlab must be running
- Gitlab must be healthy
- There is enough free space on host
- There is enough resources ( CPU /RAM ) on host

To create a backups run:
- from container: `gitlab-backup create`
- from host: `docker exec -t gitlab gitlab-backup create`

The backups file will be in */var/opt/gitlab/backups* (in container) or in */data/docker/docker-data/gitlab/data/backups* on host

# Import Backup
source [gitlab's docs](https://docs.gitlab.com/18.2/administration/backup_restore/restore_gitlab/#restore-for-docker-image-and-gitlab-helm-chart-installations)

Requirements:
- Fresh install of gitlab in **same version as the backup was created**
- Gitlab must be running
- Gitlab must be healthy
- Stop services with `gitlab-ctl stop`:
    - puma
    - sidekiq

To import a backup run:
- from container:
    ```bash
    gitlab-ctl stop puma
    gitlab-ctl stop sidekiq

    # Check if there are stopped with:
    gitlab-ctl status

    gitlab-backup restore BACKUP=1757073152_2025_09_05_18.3.1-ee
    ```
- from host:
    ```bash
    docker exec -it gitlab gitlab-ctl stop puma
    docker exec -it gitlab gitlab-ctl stop sidekiq
    
    # Check if there are stopped with:
    docker exec -it gitlab gitlab-ctl status

    docker exec -it gitlab gitlab-backup restore BACKUP=1757073152_2025_09_05_18.3.1-ee
    ```

***Maybe it can be necessary to update the ownership of the backup with `chown root:root 1757073152_2025_09_05_18.3.1-ee_gitlab_backup.tar`***
And accept all requests from the cli

**Don't forget to restart Gitlab**, run 
`docker restart gitlab` from host

Backup name is *1757073152_2025_09_05_18.3.1-ee* if the file is name is *1757073152_2025_09_05_18.3.1-ee_gitlab_backup.tar*