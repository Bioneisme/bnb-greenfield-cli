import { GreenfieldClient } from "../../utils/sdk";

export async function getStorageProviderInfo(spAddress: string) {
  try {
    const sp = await GreenfieldClient.client.sp.getStorageProviderInfo(
      spAddress
    );
    console.log(sp);
  } catch (e) {
    console.error(`Storage Provider '${spAddress}' not found: ${e}`);
  }
}
