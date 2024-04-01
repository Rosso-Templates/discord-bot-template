//-- Variables

import * as dotenv from 'dotenv';
import bot from './src/bot';


dotenv.config();

const token = process.env.BOT_TOKEN;

//--

//-- Init Bot

const client = new bot({
    auth: `Bot ${token}`,
    gateway: {
        intents: [],

        autoReconnect: true,
    },
});
client.connect();

//--