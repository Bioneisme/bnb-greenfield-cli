import { Client } from "@bnb-chain/greenfield-chain-sdk";
import {} from "@bnb-chain/greenfield-chain-sdk/dist/esm/api/queryclient";

export class GreenfieldClient {
  public static client: Client;

  public static async initClient(rpcUrl: string, chainId: string) {
    GreenfieldClient.client = Client.create(rpcUrl, chainId);
    console.log(`init client ${rpcUrl} ${chainId}`);
  }
}
