import { program } from "commander";
import { getParams } from "../commands/crosschain/getParams";
import { mirrorBucket } from "../commands/crosschain/mirrorBucket";
import { mirrorObject } from "../commands/crosschain/mirrorObject";
import { mirrorGroup } from "../commands/crosschain/mirrorGroup";

const crosschain = program.command("crosschain").description("crosschain");

crosschain
  .command("get-params")
  .description("get crosschain params")
  .action(async () => {
    await getParams();
  });

crosschain
  .command("mirror-bucket <id>")
  .description("mirror bucket")
  .action(async (id: string) => {
    await mirrorBucket(id);
  });

crosschain
  .command("mirror-object <id>")
  .description("mirror object")
  .action(async (id: string) => {
    await mirrorObject(id);
  });

crosschain
  .command("mirror-group <id>")
  .description("mirror group")
  .action(async (id: string) => {
    await mirrorGroup(id);
  });

export default crosschain;
