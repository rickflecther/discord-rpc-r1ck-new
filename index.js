"use strict";

const express = require("express");
const { ActivityType, Client, GatewayIntentBits } = require("discord.js");

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const TOKEN = process.env.DISCORD_BOT_TOKEN;
const presenceName = process.env.PRESENCE_NAME || "r1ck";
const presenceDetails = process.env.PRESENCE_DETAILS || "Online";
const presenceState = process.env.PRESENCE_STATE || "Discord bot is running";

if (!TOKEN) {
  console.error("Missing DISCORD_BOT_TOKEN. Add it to the deployment environment.");
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const app = express();
let readyAt = null;
let shuttingDown = false;

function statusPayload() {
  return { ok: Boolean(readyAt) && !shuttingDown, discordReady: client.isReady(), readyAt };
}

app.get("/", (_req, res) => {
  res.json({ service: "discord-presence-bot", ...statusPayload() });
});

app.get("/healthz", (_req, res) => {
  const status = statusPayload();
  res.status(status.ok ? 200 : 503).json(status);
});

const server = app.listen(PORT, HOST, () => {
  console.log("Health server listening on http://" + HOST + ":" + PORT);
});

client.once("ready", () => {
  readyAt = new Date().toISOString();
  client.user.setPresence({
    status: "online",
    activities: [{ name: presenceName, type: ActivityType.Playing, details: presenceDetails, state: presenceState }],
  });
  console.log("Logged in as " + client.user.tag);
  console.log("Presence configured for " + presenceName);
});

client.on("error", (error) => {
  console.error("[discord] client error:", error.message);
});

client.on("shardError", (error) => {
  console.error("[discord] gateway error:", error.message);
});

function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log("Received " + signal + "; shutting down gracefully.");
  const forceExit = setTimeout(() => process.exit(1), 10000);
  forceExit.unref();
  server.close(() => {
    client.destroy();
    clearTimeout(forceExit);
    process.exit(0);
  });
}

process.once("SIGTERM", () => shutdown("SIGTERM"));
process.once("SIGINT", () => shutdown("SIGINT"));

client.login(TOKEN).catch((error) => {
  console.error("[discord] login failed:", error.message);
  server.close(() => process.exit(1));
});
