# CMS
Using Nginx as a reverse proxy

Thinking of migrating to Treafic (or Caddy) or some simpler reverse proxy in the future.

## Config

The `nginx.local.conf` contains the config for the dev environment with a self signed certificate.
Create a new folder `reverse-proxy/ssl` and generate a new certificate with the following command:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl/local.key -out ssl/local.crt
```

`nginx.conf` should contain the production config.