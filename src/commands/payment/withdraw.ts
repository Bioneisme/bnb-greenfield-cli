import { GreenfieldClient } from "../../utils/sdk";
import {
  MsgDisableRefund,
  MsgWithdraw,
} from "@bnb-chain/greenfield-cosmos-types/greenfield/payment/tx";
import { QueryGetPaymentAccountRequest } from "@bnb-chain/greenfield-cosmos-types/greenfield/payment/query";

// Create an object with the required properties

export async function withdraw(fromAddress: string, amount: string) {
  try {
    const acc: QueryGetPaymentAccountRequest = {
      addr: fromAddress,
    };
    const msgWithDraw: MsgWithdraw = {
      creator: acc.addr,
      from: fromAddress,
      amount: amount,
    };
    await GreenfieldClient.client.payment.withdraw(msgWithDraw);
    console.log(`withdraw created`);
  } catch (e) {
    console.error(`withdraw failed: ${e}`);
  }
}
