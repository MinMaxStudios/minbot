import { existsSync } from "node:fs";
import { join } from "node:path";

async function main() {
  const dbPath = join(process.cwd(), "db.json");
  if (!existsSync(dbPath))
    return;

  const dbFile = Bun.file(dbPath);
  const db = await dbFile.json();

  for (const user of db.users) {
    if (user.mainId)
      delete user.mainId;
  }

  await Bun.write(dbPath, JSON.stringify(db));
}

main();
