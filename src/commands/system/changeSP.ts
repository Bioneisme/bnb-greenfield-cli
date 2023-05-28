import { GreenfieldClient } from "../../utils/sdk";
import { config } from "../../utils/config";
import web3Utils from "web3-utils";

export async function changeSP(address: string) {
  try {
    if (!web3Utils.isAddress(address)) {
      console.error(`'${address}' is not a valid address`);
      return;
    }
    const sp = await GreenfieldClient.client.sp.getStorageProviderInfo(address);
    if (!sp) {
      console.error("storage provider with this address not found");
      return;
    }
    config.set("spAddress", sp.operatorAddress);
    console.log(`storage provider changed to ${sp.operatorAddress}`);
  } catch (e) {
    console.error(`bucket creation failed: ${e}`);
  }
}
