import { config } from "../../utils/config";

export function systemInfo() {
  try {
    console.log(`RPC URL: ${config.get("rpcUrl")}`);
    console.log(`Chain ID: ${config.get("chainId")}`);
    console.log(`Public key: ${config.get("publicKey")}`);
    console.log(`Private key ID: ${config.get("privateKey")}`);
  } catch (e) {
    console.error(`info failed: ${e}`);
  }
}
