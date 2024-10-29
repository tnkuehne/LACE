# Web

This directory contains the web server for the project. The web server is a SvelteKit application written in Typescript that serves the frontend of the project.

## Architecture
Styling is done via [Tailwind](https://tailwindcss.com/), and the application is built using [SvelteKit](https://svelte.dev/).

## Structure
The structure is pretty standard for a SvelteKit application. Read more about [Here](https://svelte.dev/docs/kit/project-structure). 
We added one folder `src/lib/stores` for our reactive [stores](https://svelte.dev/docs/svelte/stores) (Progress and FullScreen). 
Another folder `src/lib/components` for our custom components. Components which are used only ones are kept in the same folder as the page.

#### Routing follows this structure:
```text
web/src/routes/
├── api
│   ├── analytics
│   │   ├── error # Log errors to the cms
│   │   └── quiz # Log quiz answers to the cms
│   ├── exit-preview # Exit preview mode of cms
│   ├── preview # Activate Preview mode of cms
│   └── progress # Set and get progress to the cms
├── c
│   └── [...path] # Connect device for syncing progress
├── certification # generate certificate
├── courses # List of courses
│   └── [courseSlug] # Course page with details about chapters
│       ├── chapters # just separator
│       │   └── [chapterSlug] # Learning View
│       └── survey # Form action for survey displayed in Learning View
├── sitemap.xml # SEO stuff
└── verify # Verify certificate validity
```

[Loading](https://svelte.dev/docs/kit/load) is done on the server for both layout and page to keep cms api private.

#### Hooks
We use [Hooks](https://svelte.dev/docs/kit/hooks) to log errors and check if preview mode is active.

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

We have installed husky for formatting and linting before pushing. To ensure the most basic functionality we have implemented a test (`web/tests`) which checks if the webpage loads and displays LACE and some other elements.

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

### Speed
Check the speed of the website with [Lighthouse](https://developers.google.com/web/tools/lighthouse) or [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) from time to time to see if there are any improvements to be made.