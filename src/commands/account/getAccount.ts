import { GreenfieldClient } from "../../utils/sdk";
import { config } from "../../utils/config";
import web3Utils from "web3-utils";

export async function getAccount(address: string = "") {
  try {
    if (!address) {
      address = String(config.get("publicKey"));
      if (!web3Utils.isAddress(address)) {
        console.error(`Public key '${address}' is not a valid address`);
        return;
      }
    }
    const account = await GreenfieldClient.client.account.getAccount(address);
    console.log(account);
  } catch (e) {
    console.error(`Account '${address}' not found: ${e}`);
    throw e;
  }
}
