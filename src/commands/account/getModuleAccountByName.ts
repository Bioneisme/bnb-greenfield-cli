import { GreenfieldClient } from "../../utils/sdk";

export async function getModuleAccountByName(name: string) {
  try {
    const account =
      await GreenfieldClient.client.account.getModuleAccountByName(name);
    console.log(account);
  } catch (e) {
    console.error(`Module account '${name}' not found: ${e}`);
  }
}
