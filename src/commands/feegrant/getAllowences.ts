import { GreenfieldClient } from "../../utils/sdk";
import { QueryAllowanceRequest } from "@bnb-chain/greenfield-cosmos-types/cosmos/feegrant/v1beta1/query";
import { config } from "../../utils/config";

export async function getAllowences(address: string) {
  try {
    const publicKey = String(config.get("publicKey"));
    if (!publicKey || publicKey === "undefined") {
      console.error(
        "public key is required. Please set it in the system config"
      );
      return;
    }

    const res: QueryAllowanceRequest = {
      granter: publicKey,
      grantee: address,
    };
    const allowences = await GreenfieldClient.client.feegrant.getAllowences(
      res
    );
    console.log(allowences);
  } catch (e) {
    console.error(e);
  }
}
