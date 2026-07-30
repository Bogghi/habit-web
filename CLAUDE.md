# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Nuxt 4 habit-tracking app. Package manager and runtime is **Bun** (not npm/node) — Nitro preset is `bun`, DB driver is `bun:sqlite`.

## Commands

```bash
bun install         # install deps
bun run dev          # dev server at http://localhost:3000 (runs via `bun --bun nuxt dev`)
bun run build        # production build
bun run preview      # preview production build
```

Drizzle (schema lives in `server/db/schema.ts`, migrations in `server/db/migrations/`):
```bash
bunx drizzle-kit generate   # create a migration from schema changes
bunx drizzle-kit migrate    # apply migrations
```

There is no lint or test script configured in `package.json` currently.

## Architecture

**Directory layout is Nuxt 4's `app/` + `server/` split**, plus a `shared/` dir for isomorphic types:
- `app/` — pages, layouts, components, Pinia stores, composables (standard Nuxt app dir)
- `server/` — Nitro server: API routes (`server/api/*.ts`, file-based like pages), server middleware, DB
- `shared/types/` — types auto-imported on both client and server (e.g. `LoginResponse`, `UserResponse` used unqualified in stores/pages, no import needed)

**Path aliases** `#server/*` and `#shared/*` are Nuxt 4 built-ins pointing at `server/` and `shared/` — used for imports like `#server/db`, `#server/utils/jwt` from within `server/`.

### Auth flow

JWT-based, stored in `localStorage` (key `token`) on the client — no cookies/sessions.

- `server/api/login.post.ts` / `signup.post.ts` — verify credentials with `Bun.password`, issue JWT via `signUserToken` (`server/utils/jwt.ts`, using `jose`, 7-day expiry, `sub` claim = user id)
- `server/middleware/auth.ts` — global Nitro middleware; blocks all `/api/*` routes except `PUBLIC_ROUTES` (`/api/login`, `/api/signup`) unless a valid `Bearer` token is present; sets `event.context.userId` (typed via `server/types.d.ts` H3 module augmentation) for handlers to read
- `app/middleware/app-auth.global.ts` — global Nuxt route middleware; client-side-only guard (skips on SSR) that redirects `/app/*` routes to `/login` if no valid, unexpired token is in `localStorage`
- `app/composables/useApi.ts` — thin wrapper around `$fetch` that attaches the `Authorization: Bearer <token>` header from `localStorage`; use this instead of raw `$fetch`/`useFetch` for any authenticated API call
- `app/stores/user.store.ts` — Pinia store (`userStore`) holding the logged-in user's profile; `getUserData()` is memoized via a `loaded` flag (pass `{ value: true }` to force refresh) and is called from `app/layouts/default.vue` on mount

Server-side user deletion is a soft delete: `users.delete` boolean column is set, no row is removed (`server/api/user.delete.ts`).

### Database

SQLite via Drizzle ORM, `bun:sqlite` driver (`server/db/index.ts`). DB path comes from `runtimeConfig.DB_PATH` (env `DB_PATH`, see `.env`). Query with `db.query.<table>.findFirst({ where: eq(...) })` (relational query API), not raw SQL builders, for lookups — matches existing handler style.

### UI

PrimeVue (Aura theme) + Tailwind v4 (via `@tailwindcss/vite`, not the PostCSS plugin) + PrimeIcons Vue components. Global chrome (toolbar, background) lives in `app/layouts/default.vue`; pages opt in with `definePageMeta({ layout: 'default' })`.