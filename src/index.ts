import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import http from "http";
import { createKazagumo } from "./music/lavalink";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.once("ready", () => {
    console.log(`${client.user?.tag} is online!`);
    createKazagumo(client);
    process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection:", err);
    });
    
    process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception:", err);
    });
});

// FAKE WEB SERVER (Render trick)
const port = process.env.PORT || 3000;

http.createServer((req, res) => {
    res.end("Bot is running");
}).listen(port);

client.login(process.env.TOKEN);
