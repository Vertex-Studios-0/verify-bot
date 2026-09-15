# Discord Verification — Vercel optimized

A small Next.js verification starter for Vercel Hobby/Free-style deployments.

Features:
- Discord OAuth2
- Cloudflare Turnstile
- VPN/proxy/Tor hook
- Discord verified-role assignment
- Telegram verification logs
- short-lived signed verification sessions
- basic request/rate limiting
- no database required for the basic flow

## Important deployment note

This starter intentionally does not depend on an in-memory database or long-running worker. Vercel functions are ephemeral, so production deployments should use a managed datastore (for example Redis/KV) if you need globally consistent rate limits or persistent verification state.

The included in-memory limiter is a best-effort local safeguard, not a DDoS system.

## Setup

1. Create a Discord application and bot.
2. Add the bot to the server with Manage Roles.
3. Put the bot's highest role above the Verified role.
4. Create a Cloudflare Turnstile widget for your Vercel hostname.
5. Set the environment variables from `.env.example`.
6. Set the Discord OAuth redirect URI to:
   `https://YOUR-DOMAIN/api/discord/callback`
7. Deploy to Vercel.
8. Test Turnstile with Cloudflare's official test keys before production.

## Security

Turnstile is validated server-side. Do not expose secret keys to the browser.
The VPN provider is deliberately an adapter: set IP_INTEL_API_URL/API_KEY and adjust `lib/ip-check.ts` to match your provider's response schema.

For serious abuse/DDoS protection, put a WAF/edge provider in front of the domain and use rate limiting at the edge. Do not assume application code can absorb a large DDoS.
