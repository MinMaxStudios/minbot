import { existsSync } from "node:fs";
import { mkdir, readdir } from "node:fs/promises";
import { join } from "node:path";

interface Database {
  users: {
    id: string;
    name: string;
    avatar: string;
    points: number;
    dailyPoints: number;
    messages: number;
    dailyMessages: number;
  }[];
  cooldowns: {
    id: string;
    command: string;
    time: number;
  }[];
  votes: {
    id: string;
    votes: number;
  }[];
  messages: number;
  count: number;
}

export type User = Database["users"][number];

const dbPath = join(process.cwd(), "db.json");
const backupsPath = join(process.cwd(), "backups");
export const defaultDb = {
  users: [],
  votes: [],
  cooldowns: [],
  messages: 0,
  count: 0,
} satisfies Database;
export const defaultUser = {
  points: 0,
  dailyPoints: 0,
  messages: 0,
  dailyMessages: 0,
};

if (!existsSync(dbPath)) {
  await Bun.write(
    dbPath,
    JSON.stringify(defaultDb),
  );
}

const dbFile = Bun.file(dbPath);
let dbText = await dbFile.text();
if (dbText === "" && existsSync(backupsPath)) {
  const backups = await readdir(backupsPath);
  const latestBackup = backups.sort((a, b) => b.localeCompare(a))[0];
  dbText = await Bun.file(join(backupsPath, latestBackup)).text();
  await Bun.write(dbPath, dbText);
}

const db: Database = JSON.parse(dbText);

export class Users {
  static get(id: string) {
    return db.users.find(user => user.id === id);
  }

  static getAll() {
    return [...db.users];
  }

  static insert(user: Pick<User, "id" | "name" | "avatar">) {
    const newUser = Object.assign<any, Omit<User, "id" | "name" | "avatar">>(
      user,
      defaultUser,
    ) as User;
    db.users.push(newUser);
    return newUser;
  }

  static ensure(id: string, user: Pick<User, "id" | "name" | "avatar">) {
    const existingUser = Users.get(id);
    if (existingUser)
      return existingUser;
    return Users.insert(user);
  }

  static update(id: string, user: Partial<User>) {
    const userIndex = db.users.findIndex(user => user.id === id);
    if (userIndex === -1)
      throw new Error("User not found");
    db.users[userIndex] = Object.assign(db.users[userIndex], user);
  }
}

export class Votes {
  static get(id: string) {
    return db.votes.find(vote => vote.id === id);
  }

  static getAll() {
    return [...db.votes];
  }

  static vote(id: string) {
    const vote = Votes.get(id);
    if (vote) {
      vote.votes++;
      return;
    }
    db.votes.push({
      id,
      votes: 1,
    });
  }
}

export class Cooldowns {
  static get(id: string, command: string) {
    return db.cooldowns.find(cooldown => cooldown.id === id && cooldown.command === command);
  }

  static insert(cooldown: Database["cooldowns"][number]) {
    db.cooldowns.push(cooldown);
  }
}

export function getMessages() {
  return db.messages;
}

export function incrementMessages() {
  db.messages++;
}

export function getCount() {
  return db.count;
}

export function incrementCount() {
  db.count++;
}

setInterval(async () => {
  if (!existsSync(backupsPath))
    await mkdir(backupsPath);
  await Bun.write(
    join(backupsPath, `db-${Date.now()}.json`),
    JSON.stringify(db),
  );

  await Bun.write(dbPath, JSON.stringify(db));
}, 60_000);

process.on("beforeExit", async () => {
  await Bun.write(dbPath, JSON.stringify(db));
});
