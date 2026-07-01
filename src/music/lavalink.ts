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
                url: "localhost:2333",
                auth: "youshallnotpass",
                secure: false,
            },
        ]
    );

    console.log("Lavalink system initialized (waiting for node)");
}
