//-- Variables

import { Client, ClientOptions, Collection } from 'oceanic.js';

import fs from 'node:fs';

import * as dotenv from 'dotenv';
dotenv.config();

//--

//-- Classes

export default class Bot extends Client {
    cmds: Collection<unknown, unknown>;

    constructor(props: ClientOptions) {
        super(props);

        this.cmds = new Collection();

        this.once('ready', () => {
            this.load_client();
        });
    }

    async load_client() {
        await this.load_cmds();
        await this.load_events();
    }

    async load_cmds() {
        const cmdArray = [];
        const cmdFiles = fs.readdirSync('./src/commands');

        for (const cmd_folder of cmdFiles) {
            if (!cmd_folder.includes('commandHandler')) {
                const cmd_files = fs.readdirSync(
                    `./src/commands/${cmd_folder}`
                );

                for (const cmd_file of cmd_files) {
                    const { Command } = await import(
                        `./commands/${cmd_folder}/${cmd_file}/index`
                    );
                    const cmd = new Command();

                    this.cmds.set(cmd.data.name, cmd);
                    cmdArray.push(cmd.data);
                }
            }
        }

        try {
            console.log('Loading slash commands...');

            const guildId = process.env.GUILD_ID;
            await this.application.bulkEditGuildCommands(guildId!, cmdArray);

            console.log('Slash commands loaded!');
        } catch (e) {
            console.error(e);
        }
    }

    async load_events() {
        const eventFiles = fs
            .readdirSync('./src/events')
            .filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

        for (const file of eventFiles) {
            let event = await import(`./events/${file}`);
            event = event.default;

            if (event.once) {
                this.once(event.name, (...args) =>
                    event.execute(...args, this)
                );
            } else {
                this.on(event.name, (...args) => {
                    event.execute(...args, this);
                });
            }
        }
    }
}

//--