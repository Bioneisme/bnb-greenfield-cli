#! /usr/bin/env node
import program from "./routes";
import { GreenfieldClient } from "./utils/sdk";
import { config } from "./utils/config";

async function bootstrap() {
  await GreenfieldClient.initClient(
    String(config.get("rpcUrl")),
    String(config.get("chainId"))
  );

  program.parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

bootstrap();
