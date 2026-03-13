# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Konfiguracja wysyłki e-maili (Vercel)

Aby formularz kontaktowy poprawnie wysyłał wiadomości na produkcyjny adres e-mail (np. `becia.szydelkuje@gmail.com`), musisz skonfigurować zmienne środowiskowe w panelu Vercel (sekcja **Settings > Environment Variables**).

Dodaj poniższe zmienne:

* `SMTP_HOST`: Adres serwera SMTP (dla Gmaila to `smtp.gmail.com`).
* `SMTP_PORT`: Port serwera SMTP (np. `465` dla SSL lub `587` dla TLS).
* `SMTP_USER`: Adres e-mail konta wysyłkowego.
* `SMTP_PASS`: Hasło do konta SMTP.
  * **Ważne (Gmail)**: Jeśli na koncie e-mail masz włączoną weryfikację dwuetapową (2FA), musisz wygenerować tzw. "Hasło do aplikacji" (App Password) w ustawieniach bezpieczeństwa konta Google i wkleić je tutaj zamiast standardowego hasła.
* `SMTP_FROM`: (Opcjonalnie) Adres nadawcy.
* `SMTP_TO`: Odbiorca wiadomości e-mail (adres, pod który chcesz otrzymywać wiadomości, np. `becia.szydelkuje@gmail.com`).
