import { GreenfieldClient } from "../../utils/sdk";
import { config } from "../../utils/config";
import web3Utils from "web3-utils";

export async function getPaymentAccountsByOwner() {
  try {
    const address = String(config.get("publicKey"));
    if (!web3Utils.isAddress(address)) {
      console.error(`Public key '${address}' is not a valid address`);
      return;
    }
    const account =
      await GreenfieldClient.client.account.getPaymentAccountsByOwner(address);
    console.log(account.paymentAccounts);
  } catch (e) {
    console.error(`get payment accounts failed: ${e}`);
  }
}
