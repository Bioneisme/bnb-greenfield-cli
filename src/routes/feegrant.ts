import { program } from "commander";
import { getAllowence } from "../commands/feegrant/getAllowence";
import { grantAllowance } from "../commands/feegrant/grantAllowance";
import { getAllowences } from "../commands/feegrant/getAllowences";

const feegrant = program.command("feegrant").description("feegrant");

feegrant
  .command("get-allowence <grantee>")
  .description("get allowence")
  .action(async (grantee) => {
    await getAllowence(grantee);
  });

feegrant
  .command("get-allowences <grantee>")
  .description("get allowences")
  .action(async (grantee) => {
    await getAllowences(grantee);
  });

feegrant
  .command("grant-allowence <grantee>")
  .description("grant allowence")
  .action(async (grantee) => {
    await grantAllowance(grantee);
  });

export default feegrant;
