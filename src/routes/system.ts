import { program } from "commander";
import { changeRpcUrl } from "../commands/system/changeRpcUrl";
import { changeChainId } from "../commands/system/changeChainId";
import { systemInfo } from "../commands/system/systemInfo";
import { changePrivateKey } from "../commands/system/changePrivateKey";
import { changeSP } from "../commands/system/changeSP";

const system = program.command("system").description("system settings");

system
  .command("rpc-url <url>")
  .description("change rpc url")
  .action((url) => {
    changeRpcUrl(url);
  });

system
  .command("chain-id <id>")
  .description("change chain id")
  .action((id) => {
    changeChainId(id);
  });

system
  .command("set-key <public> <private> [password]")
  .description("set public and private key")
  .action(async (pub, priv, password) => {
    await changePrivateKey(pub, priv, password);
  });

system
  .command("sp-address <address>")
  .description("set sp address")
  .action(async (address) => {
    await changeSP(address);
  });
system
  .command("info")
  .description("show system info")
  .action(() => {
    systemInfo();
  });

export default system;
