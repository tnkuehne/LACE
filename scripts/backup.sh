#!/bin/bash

# Load environment variables from .env file
source .env

# Set backup file name with timestamp
BACKUP_FILE=backup_$(date +%Y%m%d%H%M%S).sql

# Perform the backup and check if it was successful
# shellcheck disable=SC2024
if sudo docker exec -e PGPASSWORD="$POSTGRES_PASSWORD" -t "$DATABASE_CONTAINER_NAME" pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > "$BACKUP_FILE"; then
  echo "Backup $BACKUP_FILE completed successfully."
else
  echo "Backup failed." >&2
  exit 1
fi

# Compress the backup file
gzip "$BACKUP_FILE"

echo "Compressed backup to ${BACKUP_FILE}.gz completed."

# ToDo: Upload the backup file to a cloud storage (e.g., LRZ Backups)
