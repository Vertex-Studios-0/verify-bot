# Discord Verification Bot

## IMPORTANT
The `package.json` file MUST be in the repository ROOT. The `lib` folder is only for helper `.ts` files.

Correct:
```text
verify-bot/
├── app/
├── lib/
├── public/
├── package.json       <-- ROOT
├── tsconfig.json
├── next-env.d.ts
└── middleware.ts
```

In Vercel use Framework Preset `Next.js` and Root Directory `./`.

Add the environment variables from `.env.example` in Vercel. Never expose bot tokens, client secrets, Telegram tokens, Turnstile secrets, or IP API keys with `NEXT_PUBLIC_`.

Discord OAuth2 redirect URI:
`https://YOUR-DOMAIN/api/auth/discord/callback`

The Discord bot must be in the server and its highest role must be above the `Verified` role, with permission to manage roles.

`IP_INTEL_API_URL` is provider-specific. `lib/ip-check.ts` expects an endpoint accepting `?ip=` and JSON fields named `vpn`, `proxy`, `tor`, and `hosting` (or the documented aliases in that file). Adjust that adapter if your provider uses a different API.

The included in-memory rate limiter is best-effort on Vercel; use edge/WAF/rate limiting for stronger distributed protection.
