import { GreenfieldClient } from "../../utils/sdk";

export async function getStoragePriceByTime(spAddress: string) {
  try {
    const sp = await GreenfieldClient.client.sp.getStoragePriceByTime(
      spAddress
    );
    console.log(sp);
  } catch (e) {
    console.error(`Storage Provider '${spAddress}' not found: ${e}`);
  }
}
