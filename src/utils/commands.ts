import { readdir } from "node:fs/promises";

export interface Interaction {
  channel: {
    id: string;
    platform: "youtube";
  };
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  reply: (content: string) => void;
}

export interface Command {
  name: string;
  aliases?: string[];
  run: ({
    interaction,
    args,
  }: {
    interaction: Interaction;
    args: string[];
  }) => any;
}

class CommandHandler {
  private commands: Map<string, Command>;

  constructor(commands: Command[]) {
    this.commands = new Map(commands.map(command => [command.name, command]));
  }

  getCommand(name: string) {
    return (
      this.commands.get(name.toLowerCase())
      ?? [...this.commands.values()].find(command =>
        command.aliases?.includes(name.toLowerCase()),
      )
    );
  }
}

async function loadCommands() {
  const commands: Command[] = [];
  const commandFiles = await readdir("./src/commands");
  for (const file of commandFiles) {
    const command = await import(`../commands/${file}`);
    commands.push(command.default);
  }

  return commands;
}

const commands = await loadCommands();
export const commandHandler = new CommandHandler(commands);
