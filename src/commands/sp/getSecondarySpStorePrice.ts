import { GreenfieldClient } from "../../utils/sdk";

export async function getSecondarySpStorePrice() {
  try {
    const sp = await GreenfieldClient.client.sp.getSecondarySpStorePrice();
    console.log(sp);
  } catch (e) {
    console.error(e);
  }
}
