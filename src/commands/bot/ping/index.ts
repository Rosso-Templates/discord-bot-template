//-- Variables

import { CommandInteraction } from 'oceanic.js';
import CommandHandler from '../../commandHandler';

//--

//-- Event

export class Command extends CommandHandler {
    async execute(interaction: CommandInteraction) {
        await interaction.createMessage({
            content: `\`${
                Date.now() - interaction.createdAt.getTime()
            }ms\` Pong! 🏓`,
            flags: 64,
        });
    }

    constructor() {
        super({
            name: 'ping',
            description: 'Test the bots responsiveness',
        });
    }
}

//--