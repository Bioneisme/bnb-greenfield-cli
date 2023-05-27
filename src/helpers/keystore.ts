import { createStore } from "key-store";
import * as util from "util";
import * as fs from "fs";
import path from "path";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

function ifFileNotExistsCreate(filePath: string) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
  }
}

export async function createFileStore() {
  const filePath = path.join(__dirname, `../../keystore.json`);
  ifFileNotExistsCreate(filePath);
  const saveKeys = (data: any) =>
    writeFile(filePath, JSON.stringify(data), "utf8");
  const readKeys = async () =>
    JSON.parse((await readFile(filePath, "utf8")) || "{}");

  return createStore(saveKeys, await readKeys());
}
