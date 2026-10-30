# Backup Management for Postgres docker
Requirements:
- Need to know the container name and replace *$CONTAINER_NAME* by it
- Need to know the username and replace *$USERNAME* by it

## Create Backup
Requirements:
- Postgres must be running
- Postgres must be healthy
- There is enough free space on host

On host run `docker exec -t $CONTAINER_NAME pg_dumpall -c -U $USERNAME > ./backup_full.sql`

# Import Backup
Requirements:
- Fresh install of Postgres
- Postgres must be running
- Postgres must be healthy

On host run `cat ./backup_full.sql | docker exec -i $CONTAINER_NAME psql -U $USERNAME`
