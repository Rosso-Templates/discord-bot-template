//-- Variables

interface CommandData {
    name?: string;
    description?: string;
    type?: number | 1;

    cooldown?: number;

    defaultMemberPermissions?: bigint;

    options?: Array<CommandOption>;
}

interface CommandOption {
    name?: string;
    description?: string;
    type?: number;
    required?: boolean;

    choices?: Array<Choice>;

    options?: Array<CommandOption>;
}

interface Choice {
    name?: string;
    value?: any;
}

//--

//-- Classes

export default class CommandHandler {
    data: CommandData;

    constructor(options: CommandData) {
        this.data = options;
    }
}

//--