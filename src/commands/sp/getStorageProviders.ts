import { GreenfieldClient } from "../../utils/sdk";

export async function getStorageProviders() {
  try {
    const sp = await GreenfieldClient.client.sp.getStorageProviders();
    console.log(sp);
  } catch (e) {
    console.error(e);
  }
}
