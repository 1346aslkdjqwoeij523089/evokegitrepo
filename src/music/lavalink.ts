import { Kazagumo } from "kazagumo";
import { Connectors } from "shoukaku";

export let kazagumo;

export function createKazagumo(client) {
    kazagumo = new Kazagumo(
        {
            defaultSearchEngine: "youtube",
            send: (guildId, payload) => {
                const guild = client.guilds.cache.get(guildId);
                if (guild) guild.shard.send(payload);
            },
        },
        new Connectors.DiscordJS(client),
        [
            {
                name: "main",
                url: "http://127.0.0.1:2333", // ✅ LOCAL LAVALINK (NO PUBLIC NODES)
                auth: "youshallnotpass",
                secure: false,
            },
        ]
    );

    // 🧯 SAFE ERROR HANDLING (PREVENT CRASHES)
    kazagumo.shoukaku.on("error", (name, error) => {
        console.log("[Lavalink Error]", name, error?.message || error);
    });

    kazagumo.shoukaku.on("close", (name, code, reason) => {
        console.log("[Lavalink Closed]", name, code, reason?.toString());
    });

    kazagumo.shoukaku.on("ready", (name) => {
        console.log("[Lavalink Ready]", name);
    });

    console.log("Kazagumo initialized (waiting for Lavalink)");
}
