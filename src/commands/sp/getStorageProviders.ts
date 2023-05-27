import { GreenfieldClient } from "../../utils/sdk";
import { StorageProvider } from "@bnb-chain/greenfield-cosmos-types/greenfield/sp/types";

export async function getStorageProviders(): Promise<StorageProvider[]> {
  return await GreenfieldClient.client.sp.getStorageProviders();
}
