# Helping Scripts

This directory contains scripts that can be used to help with various tasks. The scripts are written in Python and are meant to be run from the command line.

### Backups

The `backup.sh` script is used to backup the CMS including the database and the uploads directory. The script uses `docker-compose` to run the backup commands. The script will create a compressed archive
which you can upload to a cloud storage provider.