import { GreenfieldClient } from "../../utils/sdk";

export async function getParams() {
  try {
    const res = await GreenfieldClient.client.crosschain.getParams();
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}
