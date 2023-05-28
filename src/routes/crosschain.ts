import { program } from "commander";
import { getParams } from "../commands/crosschain/getParams";

const crosschain = program.command("crosschain").description("crosschain");

crosschain
  .command("get-params")
  .description("get crosschain params")
  .action(async () => {
    await getParams();
  });

export default crosschain;
