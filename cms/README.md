# CMS
Using [Directus](https://docs.directus.io/) as a headless CMS. The web server will interact with the CMS to get the data. The management interface is available at `/cms/admin` or locally on port `8055`.

## Export Schema
https://docs.directus.io/self-hosted/cli.html#migrate-schema-to-a-different-environment

```bash
sudo docker compose exec -it cms npx directus schema snapshot --yes ./snapshot.yaml
sudo docker compose cp cms:/directus/snapshot.yaml ~/snapshot.yaml
```

## Import Schema

Useful when making changes to the schema and want to apply them to the production environment.

```bash
sudo docker compose cp ~/snapshot.yaml cms:/directus/snapshot.yaml
sudo docker compose exec -it cms npx directus schema snapshot apply --yes ./snapshot.yaml
```

Note that the version of export and import should be the same.

## Config

The [configuration](https://docs.directus.io/self-hosted/config-options.html) is mostly done by environment variables.

## Speed
If the speed of the should ever be a bottleneck, try using Redis as a cache. 
You need to set the environment variable and add a new redis service in docker compose.

## Accounts
This is set in the environment variables. Other accounts can be created in the admin interface.