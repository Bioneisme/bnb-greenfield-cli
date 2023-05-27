import { config } from "../../utils/config";

export function changeChainId(chainId: string) {
  try {
    const oldChainId = config.get("chainId");
    config.set("chainId", chainId);
    console.log(
      `Change chain ID from ${oldChainId} to ${chainId} successfully`
    );
  } catch (e) {
    console.error(`Change chain ID failed: ${e}`);
  }
}
