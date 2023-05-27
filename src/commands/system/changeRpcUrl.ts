import { config } from "../../utils/config";

export function changeRpcUrl(url: string) {
  try {
    const oldUrl = config.get("rpcUrl");
    config.set("rpcUrl", url);
    console.log(`Change RPC URL from ${oldUrl} to ${url} successfully`);
  } catch (e) {
    console.error(`Change RPC URL failed: ${e}`);
  }
}
