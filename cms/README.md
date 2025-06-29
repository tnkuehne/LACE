# CMS
Using [Directus](https://docs.directus.io/) as a headless CMS. The web server will interact with the CMS to get the data. The management interface is available at `/cms/admin` or locally on port `8055`.

## Schema
You can export and import the schema of the database. 
### Export Schema
https://docs.directus.io/self-hosted/cli.html#migrate-schema-to-a-different-environment

```bash
sudo docker compose exec -it cms npx directus schema snapshot --yes ./snapshot.yaml
sudo docker compose cp cms:/directus/snapshot.yaml ~/snapshot.yaml
```

### Import Schema

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
The admin account is set in the environment variables. Other accounts can be created in the admin interface.
One account for the web app is needed but besides this it is up to you how many accounts you want to create and
what permissions they should have.

## Location Service

To get the location on the map in the cms interface you first need to upload a mapping
to the table ip2city. I used [dp-ip](https://db-ip.com/db/ip-to-location) for this.
You can import the csv file by using a small python script.
After this you need to create a flow in the cms with the following consecutive steps:

#### Trigger
```text
Event Hook
Type: Action
Scope: item.create
Collections: page_views
```

#### Run script
```typescript
module.exports = async function(data) {
    ip = data.$trigger.payload.ip;
	ip_int = ip.split('.').reduce(function(ipInt, octet) { return (ipInt<<8) + parseInt(octet, 10)}, 0) >>> 0;
	return {ip_int};
}
```

#### Read Data
From ip2city
```typescript
{
    "filter": {
        "_and": [
            {
                "first_ip_int": {
                    "_lte": "{{$last.ip_int}}"
                }
            },
            {
                "last_ip_int": {
                    "_gte": "{{$last.ip_int}}"
                }
            }
        ]
    }
}
```

#### Update data
Payload:
```typescript
{
    "ip": null,
        "location_point": {
        "type": "Point",
            "coordinates": [
            "{{ $last[0].longitude }}",
            "{{ $last[0].latitude }}"
        ]
    }
}
```

Query:
```typescript
{
    "filter": {
        "id": {
            "_eq": "{{ $trigger.key }}"
        }
    }
}
``` 