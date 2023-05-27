import { Client } from "@bnb-chain/greenfield-chain-sdk";

export class GreenfieldClient {
  public static client: Client;

  public static async initClient(rpcUrl: string, chainId: string) {
    GreenfieldClient.client = Client.create(rpcUrl, chainId);
    console.log(`init client ${rpcUrl} ${chainId}`);
  }
}
