import { GreenfieldClient } from "../../utils/sdk";

export async function getModuleAccounts() {
  try {
    const account = await GreenfieldClient.client.account.getModuleAccounts();
    console.log(account.accounts);
  } catch (e) {
    console.error(`get module accounts failed: ${e}`);
  }
}
