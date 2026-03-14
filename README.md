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

## Konfiguracja wysyłki e-maili przez Gmail OAuth2 (Vercel)

Aby formularz kontaktowy wysyłał maile za pomocą Nodemailer używając bezpiecznego protokołu OAuth2 zamiast hasła, musisz ustawić odpowiednie zmienne w panelu Vercel (sekcja **Settings > Environment Variables**).

1. Otwórz [Google Cloud Console](https://console.cloud.google.com/).
2. Utwórz nowy projekt i włącz dla niego API "Gmail API".
3. Skonfiguruj ekran zgody OAuth (OAuth Consent Screen), wybierając typ zewnętrzny lub wewnętrzny i dodając samego siebie jako użytkownika testowego (jeśli projekt nie jest zweryfikowany).
4. Przejdź do zakładki **Credentials**, stwórz nowe poświadczenia typu **OAuth client ID** wybierając "Aplikacja internetowa" (Web application) lub "Aplikacja dla komputerów" (Desktop app). Otrzymasz wtedy **Client ID** i **Client Secret**. W "Authorized redirect URIs" możesz użyć `https://developers.google.com/oauthplayground` (do łatwego wygenerowania tokenu odświeżającego).
5. Otwórz [OAuth 2.0 Playground](https://developers.google.com/oauthplayground).
   - W ustawieniach (zębatka w prawym górnym rogu) zaznacz "Use your own OAuth credentials" i wklej swoje wygenerowane **Client ID** oraz **Client Secret**.
   - W kroku 1 wpisz scope: `https://mail.google.com/` i autoryzuj żądanie logując się na swoje konto.
   - W kroku 2 kliknij "Exchange authorization code for tokens", aby otrzymać **Refresh token**.

Zmienne do wstawienia w Vercel:
* `SMTP_USER`: E-mail, z którego będziesz autoryzować wysyłkę e-maili.
* `SMTP_OAUTH_CLIENT_ID`: Wygenerowany w Google Cloud Client ID.
* `SMTP_OAUTH_CLIENT_SECRET`: Wygenerowany w Google Cloud Client Secret.
* `SMTP_OAUTH_REFRESH_TOKEN`: Refresh token uzyskany z OAuth 2.0 Playground.
* `SMTP_FROM`: E-mail z którego technicznie zostaną wysłane powiadomienia (zazwyczaj to ten sam co `SMTP_USER`).
* `SMTP_TO`: Odbiorca wiadomości e-mail (np. `becia.szydelkuje@gmail.com`).
