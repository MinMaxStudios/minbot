import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

interface Database {
  users: {
    id: string;
    name: string;
    avatar: string;
    points: number;
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
export const defaultDb = {
  users: [],
  votes: [],
  messages: 0,
  count: 0,
} satisfies Database;

async function initDatabase() {
  if (!existsSync(dbPath)) {
    await Bun.write(
      dbPath,
      JSON.stringify(defaultDb),
    );
  }
}

await initDatabase();

const dbFile = Bun.file(dbPath);
const db: Database = await dbFile.json();

for (const key in defaultDb) {
  if (!db[key as keyof Database])
    (db as any)[key] = defaultDb[key as keyof Database];
}

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
      {
        points: 0,
      },
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

const backupsPath = join(process.cwd(), "backups");
setInterval(async () => {
  if (!existsSync(backupsPath))
    await mkdir(backupsPath);
  await Bun.write(
    join(backupsPath, `db-${Date.now()}.json`),
    JSON.stringify(db),
  );

  await Bun.write(dbPath, JSON.stringify(db));
}, 60_000);
