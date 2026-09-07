# Discord Presence Bot

This project runs a supported Discord bot that publishes an activity presence and exposes a health endpoint.

## Security

Do not use a personal Discord account token or a self-bot. Discord user-account automation can result in account termination. If a token was exposed, revoke it immediately and create a new bot token in the Discord Developer Portal.

## Setup

1. Create an application and bot in the Discord Developer Portal.
2. Copy the bot token into the deployment environment as DISCORD_BOT_TOKEN. Do not commit it.
3. Invite the bot with the bot scope and only the permissions it needs. This app only publishes its own activity.
4. Run npm install and npm start.

## Environment variables

- DISCORD_BOT_TOKEN: required bot token.
- PORT: optional HTTP port; defaults to 3000.
- PRESENCE_NAME: optional activity name.
- PRESENCE_DETAILS: optional first activity line.
- PRESENCE_STATE: optional second activity line.

## Health checks

- / returns service status.
- /healthz returns HTTP 200 only after Discord is ready; otherwise it returns HTTP 503.

A free hosting plan may sleep or stop the service. The health endpoint does not bypass hosting-plan limits.
