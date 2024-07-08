#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

source .env

TIMESTAMP=$(date +%Y%m%d%H%M%S)
BACKUP_DIR="directus_backup_$TIMESTAMP"
FINAL_BACKUP_FILE="directus_full_backup_$TIMESTAMP.tar.gz"

# Ensure required variables are set
for var in UPLOADS_PATH DIRECTUS_CONTAINER_NAME DATABASE_CONTAINER_NAME POSTGRES_PASSWORD POSTGRES_USER POSTGRES_DB; do
    if [ -z "${!var}" ]; then
        echo "$var is not set. Please set it in the .env file." >&2
        exit 1
    fi
done

# Create temporary backup directory
mkdir -p "$BACKUP_DIR"

# Backup uploads
UPLOADS_BACKUP_FILE="uploads_$TIMESTAMP.tar.gz"
echo "Backing up uploads..."
if sudo docker exec "$DIRECTUS_CONTAINER_NAME" tar -czf "/tmp/$UPLOADS_BACKUP_FILE" "${UPLOADS_PATH#/}"; then
    sudo docker cp "$DIRECTUS_CONTAINER_NAME:/tmp/$UPLOADS_BACKUP_FILE" "$BACKUP_DIR/"
    echo "Uploads backup completed successfully."
else
    echo "Uploads backup failed." >&2
    exit 1
fi

# Backup database
DB_BACKUP_FILE="database_$TIMESTAMP.sql"
echo "Backing up database..."
# shellcheck disable=SC2024
if sudo docker exec -e PGPASSWORD="$POSTGRES_PASSWORD" "$DATABASE_CONTAINER_NAME" pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > "$BACKUP_DIR/$DB_BACKUP_FILE"; then
    echo "Database backup completed successfully."
else
    echo "Database backup failed." >&2
    exit 1
fi

# Create final tar.gz archive
echo "Creating final backup archive..."
tar -czf "$FINAL_BACKUP_FILE" -C "$BACKUP_DIR" .

# Clean up temporary files
rm -rf "$BACKUP_DIR"

echo "Full backup completed: $FINAL_BACKUP_FILE"
echo "You can now move this file to your cloud storage."

# ToDo: Upload the backup file to a cloud storage (e.g., LRZ Backups)
# until then use scp to copy the backup file to your local machine