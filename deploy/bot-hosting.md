# Bot-Hosting.net deployment

This is the no-payment deployment path for the Discord bot. Bot-Hosting.net's free plan does not require a credit card, but it requires manual renewal every 4 days and has resource limits.

## 1. Create the Discord bot

1. Open the Discord Developer Portal and create an application.
2. Open the Bot page and create the bot user.
3. Copy the new bot token. Never use a personal Discord account token.
4. Invite the bot to your server with the bot scope and only the permissions it needs.

## 2. Create the free deployment

1. Create a free account at Bot-Hosting.net. No card or billing method should be needed.
2. Create one free Node.js server.
3. Import this GitHub repository: https://github.com/rickflecther/discord-rpc-r1ck-new
4. Use the main branch and the Node.js runtime.
5. Set the startup command to: npm start

## 3. Add environment variables

Add these in the provider's environment-variable manager:

- DISCORD_BOT_TOKEN: the newly-created Discord bot token
- PRESENCE_NAME: r1ck
- PRESENCE_DETAILS: Online
- PRESENCE_STATE: Discord bot is running

Do not put the token in GitHub files, commit messages, screenshots, or chat. If it is exposed, reset it in the Discord Developer Portal.

## 4. Start and maintain it

Start or reinstall the server so it installs package.json dependencies, then check the console for the bot login message.
The free plan is advertised as always-on, but it requires manual renewal every 4 days. Set a reminder and renew it before it expires.

The bot does not need an exposed HTTP port for Discord connectivity. The Express health endpoint can remain internal unless the provider requires a port.
