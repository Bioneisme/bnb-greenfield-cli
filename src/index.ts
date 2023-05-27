#! /usr/bin/env node
import program from "./routes";
import { GreenfieldClient } from "./utils/sdk";

async function bootstrap() {
  await GreenfieldClient.initClient(
    "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org",
    "5600"
  );

  program.parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

bootstrap();
