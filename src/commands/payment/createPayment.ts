import { GreenfieldClient } from "../../utils/sdk";
import {
  MsgDeposit,
  MsgDisableRefund,
  MsgWithdraw,
} from "@bnb-chain/greenfield-cosmos-types/greenfield/payment/tx";

// Create an object with the required properties

export async function createDeposit(
  creator: string,
  to: string,
  amount: string
) {
  try {
    const deposit: MsgDeposit = {
      creator: creator,
      to: to,
      amount: amount, // amount of token to deposit
    };
    await GreenfieldClient.client.payment.deposit(deposit);
    console.log(`deposit created`);
  } catch (e) {
    console.error(`deposit creation failed: ${e}`);
  }
}
