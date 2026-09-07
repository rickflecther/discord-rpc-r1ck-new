# Oracle Cloud Always Free deployment

This guide runs the official Discord bot continuously on an Oracle Cloud Always Free VM using Docker. It does not use a personal Discord account token or a self-bot.

## 1. Create the VM

1. Create an Oracle Cloud Free Tier account and choose your home region.
2. Create a Compute instance with an Always Free eligible Ampere A1.Flex shape. A small setup is 1 OCPU and 6 GB RAM.
3. Use an Ubuntu ARM image, assign a public IPv4 address, and save the SSH private key securely.
4. If the shape is unavailable, try another availability domain or retry later. Do not switch to a paid shape by accident.

## 2. Install Docker and download the repo

On the VM, run:

    sudo apt update
    sudo apt install -y docker.io docker-compose-plugin git
    sudo systemctl enable --now docker
    git clone https://github.com/rickflecther/discord-rpc-r1ck-new.git
    cd discord-rpc-r1ck-new

## 3. Configure the secret

Run the following and edit the file locally on the VM:

    cp .env.example .env
    nano .env

Set DISCORD_BOT_TOKEN to a newly-created bot token from the Discord Developer Portal. Never use the exposed personal token and never commit .env.

## 4. Start it

    sudo docker compose up -d --build
    sudo docker compose logs -f

The container uses restart: unless-stopped, so Docker starts it again after a VM reboot. Check readiness with:

    curl http://127.0.0.1:3000/healthz

A healthy response contains ok: true and discordReady: true.

## 5. Updating the bot

    cd ~/discord-rpc-r1ck-new
    git pull
    sudo docker compose up -d --build

Keep port 3000 closed in the Oracle security list unless you need an external uptime monitor. The bot itself only needs outbound internet access.
