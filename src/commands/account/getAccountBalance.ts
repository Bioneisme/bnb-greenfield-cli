import { GreenfieldClient } from "../../utils/sdk";
import { QueryBalanceRequest } from "@bnb-chain/greenfield-cosmos-types/cosmos/bank/v1beta1/query";
import web3Utils from "web3-utils";

export async function getAccountBalance(req: QueryBalanceRequest) {
  try {
    if (!web3Utils.isAddress(req.address)) {
      console.error(`Public key '${req.address}' is not a valid address`);
      return;
    }
    const balance = await GreenfieldClient.client.account.getAccountBalance(
      req
    );
    console.log(balance);
  } catch (e) {
    console.error(`get account balance failed: ${e}`);
  }
}
