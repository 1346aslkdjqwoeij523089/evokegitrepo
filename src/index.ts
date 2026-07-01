import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import { createKazagumo } from "./music/lavalink";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.once("ready", () => {
    console.log(`${client.user?.tag} is online!`);

    // INIT MUSIC SYSTEM
    createKazagumo(client);
});

client.login(process.env.TOKEN);
