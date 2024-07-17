//-- Variables

import {
    CommandInteraction,
    AnyInteractionGateway,
    Collection,
} from 'oceanic.js';
import { statusEmbed } from '../utils/embeds';

const cooldowns: Collection<string, number> = new Collection();

//--

//-- Event

export default {
    name: 'interactionCreate',

    async execute(interaction: AnyInteractionGateway, client: any) {
        if (interaction instanceof CommandInteraction) {
            if (!interaction.guild) return;

            const cmd = client.cmds.get(interaction.data.name);

            if (!cmd) return;
            if (!interaction.member) return;

            const user = cooldowns.get(interaction.member.id);

            if (user) {
                const last_used = Date.now() - user;

                if (last_used < cmd.data.cooldown) {
                    return interaction.createMessage({
                        embeds: [
                            statusEmbed(
                                `You're using this command too quickly! Try again in \`${
                                    last_used / 1000
                                }s\``
                            ),
                        ],
                        flags: 64,
                    });
                }
            }

            try {
                cooldowns.set(interaction.member.id, Date.now());
                await cmd.execute(interaction, client);
            } catch (e) {
                console.error(e);
            }
        }
    },
};

//--