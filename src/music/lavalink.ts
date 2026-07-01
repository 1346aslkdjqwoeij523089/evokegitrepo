import { Kazagumo } from "kazagumo";
import { Connectors } from "shoukaku";

export let kazagumo: any;

export function createKazagumo(client: any) {
    kazagumo = new Kazagumo(
        {
            defaultSearchEngine: "youtube",
            send: (guildId: any, payload: any) => {
                const guild = client.guilds.cache.get(guildId);
                if (guild) guild.shard.send(payload);
            },
        },
        new Connectors.DiscordJS(client),
        [
            {
                name: "main",
                url: process.env.LAVALINK_URL || "http://127.0.0.1:2333",
                auth: process.env.LAVALINK_PASSWORD || "youshallnotpass",
                secure: false,
            },
        ]
    );

    kazagumo.shoukaku.on("error", (name: any, error: any) => {
        console.log("[Lavalink Error]", name, error?.message || error);
    });

    kazagumo.shoukaku.on("close", (name: any, code: any, reason: any) => {
        console.log("[Lavalink Closed]", name, code, reason?.toString());
    });

    kazagumo.shoukaku.on("ready", (name: any) => {
        console.log("[Lavalink Ready]", name);
    });

    console.log("Kazagumo initialized");
}
