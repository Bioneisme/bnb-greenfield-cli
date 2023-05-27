import { GreenfieldClient } from "../../utils/sdk";
import { QueryGetPaymentAccountRequest } from "@bnb-chain/greenfield-cosmos-types/greenfield/payment/query";

export async function getPaymentAccount(acc: QueryGetPaymentAccountRequest) {
  try {
    const account = await GreenfieldClient.client.account.getPaymentAccount(
      acc
    );
    console.log(account.paymentAccount);
  } catch (e) {
    console.error(`payment account '${acc.addr}' not found: ${e}`);
  }
}
