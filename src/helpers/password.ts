import { createInterface } from "readline";
import { createFileStore } from "./keystore";
import { config } from "../utils/config";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readLineAsync = (msg: string) => {
  return new Promise((resolve) => {
    readline.question(msg, (userRes) => {
      resolve(userRes);
    });
  });
};

export async function getPrivateKey(password: string = ""): Promise<any> {
  const store = await createFileStore();
  try {
    return await store.getPrivateKeyData(
      String(config.get("privateKey")),
      password
    );
  } catch (e: any) {
    if (e.message === "Decryption failed.") {
      console.error("Invalid password");
      const pass = await readLineAsync("Enter password: ");
      return await getPrivateKey(String(pass));
    } else {
      console.error(
        "private key is required. Please set it in the system config"
      );
      throw e;
    }
  }
}
