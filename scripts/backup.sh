#!/bin/bash

source .env

TIMESTAMP=$(date +%Y%m%d%H%M%S)
DB_BACKUP_FILE=db_backup_$TIMESTAMP.sql
UPLOADS_BACKUP_FILE=uploads_$TIMESTAMP.tar.gz
FINAL_BACKUP_FILE=backup_$TIMESTAMP.tar.gz

# shellcheck disable=SC2024
if sudo docker exec -e PGPASSWORD="$POSTGRES_PASSWORD" -t "$DATABASE_CONTAINER_NAME" pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > "$DB_BACKUP_FILE"; then
  echo "Database backup $DB_BACKUP_FILE completed successfully."
else
  echo "Database backup failed." >&2
  exit 1
fi

gzip "$DB_BACKUP_FILE"
tar -czf "$UPLOADS_BACKUP_FILE" "$UPLOADS_PATH"
tar -czf "$FINAL_BACKUP_FILE" "${DB_BACKUP_FILE}".gz "$UPLOADS_BACKUP_FILE"
rm "${DB_BACKUP_FILE}".gz "$UPLOADS_BACKUP_FILE"

echo "Final backup $FINAL_BACKUP_FILE created successfully."

# ToDo: Upload the backup file to a cloud storage (e.g., LRZ Backups)
