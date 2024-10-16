## Export Schema
https://docs.directus.io/self-hosted/cli.html#migrate-schema-to-a-different-environment

```bash
sudo docker compose exec -it cms npx directus schema snapshot --yes ./snapshot.yaml
sudo docker compose cp cms:/directus/snapshot.yaml ~/snapshot.yaml
```

## Import Schema

```bash
sudo docker compose cp ~/snapshot.yaml cms:/directus/snapshot.yaml
sudo docker compose exec -it cms npx directus schema snapshot apply --yes ./snapshot.yaml
```