import { program } from "commander";
import {getModuleAccounts} from "../commands/account/getModuleAccounts";
import {getAccount} from "../commands/account/getAccount";
import {createPaymentAccount} from "../commands/account/createPaymentAccount";
import { MsgCreatePaymentAccount } from '@bnb-chain/greenfield-cosmos-types/greenfield/payment/tx';
import {getPaymentAccount} from "../commands/account/getPaymentAccount";
import {QueryGetPaymentAccountRequest} from "@bnb-chain/greenfield-cosmos-types/greenfield/payment/query";
import {transfer} from "../commands/account/transfer";

const account = program.command("account").description("account");

account.command("module").description("module accounts").action(async () => {
    await getModuleAccounts();
});

account.command("info <address>").description("info with the account address").action(async (address) => {
    await getAccount(address);
});

account.command("create <address>").description("create payment account").action(async (address) => {
    const acc: MsgCreatePaymentAccount = {
        creator: address,
    }
    await createPaymentAccount(acc);
});

account.command("get <address>").description("get payment account").action(async (address) => {
    const acc: QueryGetPaymentAccountRequest = {
        addr: address,
    }
    await getPaymentAccount(acc);
});

account.command("transfer <from> <to> <amount>").description("transfer").action(async (from, to, amount) => {
    await transfer(from, to, amount);
});
export default account;