import { createPaymentAccount } from "../commands/payment/createPaymentAccount";
import { getPaymentAccount } from "../commands/payment/getPaymentAccount";
import { getPaymentAccountsByOwner } from "../commands/payment/getPaymentAccountsByOwner";
import { transfer } from "../commands/payment/transfer";
import { QueryGetPaymentAccountRequest } from "@bnb-chain/greenfield-cosmos-types/greenfield/payment/query";
import { MsgCreatePaymentAccount } from "@bnb-chain/greenfield-cosmos-types/greenfield/payment/tx";
import { program } from "commander";

const payment = program.command("payment").description("payment");

payment
  .command("create-payment")
  .description("create payment account")
  .action(async () => {
    await createPaymentAccount();
  });

payment
  .command("get-payment <address>")
  .description("get payment account")
  .action(async (address) => {
    const acc: QueryGetPaymentAccountRequest = {
      addr: address,
    };
    await getPaymentAccount(acc);
  });

payment
  .command("get-payments")
  .description("get payment accounts by owner")
  .action(async () => {
    await getPaymentAccountsByOwner();
  });

payment
  .command("transfer <to> <amount>")
  .description("transfer")
  .action(async (to, amount) => {
    await transfer(to, amount);
  });
export default payment;
