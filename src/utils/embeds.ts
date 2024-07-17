//-- Variables

import config from '../config.json';

//--

//-- Functions

export function statusEmbed(description: string, success?: boolean) {
    return {
        description,
        color: Number(
            success ? config.embed_colors.success : config.embed_colors.error
        ),
    };
}

//--