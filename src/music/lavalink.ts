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
                url: `${process.env.LAVALINK_HOST}:${process.env.LAVALINK_PORT}`,
                auth: process.env.LAVALINK_PASSWORD!,
                secure: false,
            },
        ]
    );

    console.log("Lavalink connected");
}
