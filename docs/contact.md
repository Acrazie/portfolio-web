# Contact form

The header and footer open a shared, bilingual Base UI dialog. Drafts remain in React memory when it is closed or an attempt fails; reloading the page discards them. Successful submission clears the draft. The server sends plain text via Resend, using the visitor email only as `reply_to` and the configured recipient only as `to`.

## Runtime configuration

Set these variables on the portfolio server in Dokploy, not in the frontend or build arguments:

- `RESEND_API_KEY`: a sending-only key restricted to the verified domain.
- `CONTACT_FROM`: for example `Portfolio <portfolio@contact.acrazie.dev>`; the sender domain must be verified in Resend.
- `CONTACT_TO`: `mayeul.desbazeille@gmail.com`.

No SDK, database, mail server, inbound mail configuration or background worker is required. Keep Resend on its Free plan without paid overages. The provider processes message content and may retain delivery logs; the portfolio itself does not persist messages or log payloads/secrets. The form discloses the provider to visitors.

## Security and limits

`POST /api/contact` accepts same-origin JSON only, bounds the streamed body to 24 KB, validates all fields, and silently discards filled honeypots. It does not trust forwarding headers for visitor identity. A synchronous, global in-memory admission budget permits at most 5 attempts/minute, 90/day and 2,800/31 days per process. Invalid requests and failures also consume this budget. This intentionally favors quota protection over availability: an attacker can exhaust it, but direct email and LinkedIn remain available.

Budget counters reset on process restart and are not shared between replicas. Resend Free is the final quota boundary; the local budget is not a distributed abuse prevention system. If traffic or abuse grows, add edge protection before increasing capacity. No CAPTCHA or IP tracking is currently used.

The handler compares `Origin` against the request URL origin. Before deployment, verify the reverse proxy preserves the public scheme and host seen by TanStack Start; a mismatch fails closed with 403. Do not fix it by trusting arbitrary client headers.

The email request times out after 10 seconds; browser waiting ends after 15 seconds. Success means Resend accepted the email, not that Gmail delivered it. An uncertain timeout retains the draft and offers retry; a manual retry can duplicate an email already accepted. No automatic retries are performed.

## Verification and release

- `bun run check`
- `bun run test:e2e`

Tests use synthetic messages and mock delivery. No real message is sent by the test suite. After explicit deployment approval, verify the domain and runtime configuration without exposing secrets, submit one real test, confirm receipt in Gmail and test Reply-To. Do not claim production delivery until this succeeds.
