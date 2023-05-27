import { GreenfieldClient } from "../../utils/sdk";
import { MsgCreatePaymentAccount } from "@bnb-chain/greenfield-cosmos-types/greenfield/payment/tx";

export async function createPaymentAccount(acc: MsgCreatePaymentAccount) {
  try {
    await GreenfieldClient.client.account.createPaymentAccount(acc);
    console.log(`payment account created`);
  } catch (e) {
    console.error(`payment account creation failed: ${e}`);
  }
}
