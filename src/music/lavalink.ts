import { Kazagumo } from "kazagumo";
import { Connectors } from "shoukaku";

export let kazagumo: Kazagumo;

export function createKazagumo(client: any) {
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
                url: "lava-v4.darrennathanael.com:80",
                auth: "youshallnotpass",
                secure: false,
            },
        ]
    );

    // 🧯 PREVENT CRASH
    kazagumo.shoukaku.on("error", (name, error) => {
        console.log("Lavalink error:", name, error.message);
    });

    kazagumo.shoukaku.on("close", (name, code, reason) => {
        console.log("Lavalink closed:", name, code, reason?.toString());
    });

    console.log("Kazagumo initialized");
}
