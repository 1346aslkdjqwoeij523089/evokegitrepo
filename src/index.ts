import "dotenv/config";
import http from "http";
import { Client, GatewayIntentBits } from "discord.js";
import { createKazagumo } from "./music/lavalink";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

// Discord ready
client.once("ready", () => {
    console.log(`${client.user?.tag} is online!`);
    createKazagumo(client);
});

// 🟢 KEEP RENDER HAPPY (REQUIRED)
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Bot is alive");
});

server.listen(process.env.PORT || 3000);

client.login(process.env.TOKEN);
