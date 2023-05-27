import { getModuleAccounts } from "../commands/account/getModuleAccounts";
import { getAccount } from "../commands/account/getAccount";
import { createWeb3Account } from "../commands/account/createWeb3Account";
import { getAccountBalance } from "../commands/account/getAccountBalance";
import { getModuleAccountByName } from "../commands/account/getModuleAccountByName";
import { QueryBalanceRequest } from "@bnb-chain/greenfield-cosmos-types/cosmos/bank/v1beta1/query";
import { config } from "../utils/config";
import { program } from "commander";

const account = program.command("account").description("account");

account
  .command("my-info")
  .description("get account info")
  .action(async () => {
    await getAccount();
  });

account
  .command("info <address>")
  .description("get account info by address")
  .action(async (address) => {
    await getAccount(address);
  });

account
  .command("create")
  .description("create web3 account")
  .action(async () => {
    await createWeb3Account();
  });

account
  .command("my-balance <denom>")
  .description("get my account balance")
  .action(async (denom) => {
    const req: QueryBalanceRequest = {
      address: String(config.get("publicKey")),
      denom,
    };
    await getAccountBalance(req);
  });
account
  .command("balance <address> <denom>")
  .description("get account balance")
  .action(async (address, denom) => {
    const req: QueryBalanceRequest = {
      address,
      denom,
    };
    await getAccountBalance(req);
  });

account
  .command("mls")
  .description("module accounts")
  .option("-n, --name <name>", "get module account by name", async (name) => {
    await getModuleAccountByName(name);
  })
  .option("-a, -all", "get all module accounts", async () => {
    await getModuleAccounts();
  });

export default account;
