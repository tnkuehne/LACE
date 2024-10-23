# Web

This directory contains the web server for the project. The web server is a SvelteKit application written in Typescript that serves the frontend of the project.

## Architecture
Styling is done via [Tailwind](https://tailwindcss.com/), and the application is built using [SvelteKit](https://svelte.dev/).

## Developing

Installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

> Use `Dockerfile.dev` to run the development version of the web server. Keep in mind that you probably need the other services running as well.

At the moment we have just one test to see if the main page loads.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

> Use `Dockerfile` to run the production version of the web server.


## Quality

```bash
cd web
sudo codeclimate analyze
```

### Good example of SvelteKit code:
- https://github.com/sveltejs/realworld
- https://svelte.dev/docs/kit

### Analyzing bundle size
Need to remove the comment in the `vite.config.ts` file.
```bash 
cd web
npm run build
open ./svelte-kit/adapter-node/stats.html
```