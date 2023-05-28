import { program } from "commander";
import chalk from "chalk";
import { version } from "../commands/version";
import { version as cliVersion } from "../../package.json";
import clear from "clear";
import figlet from "figlet";
import "./sp";
import "./account";
import "./system";
import "./payment";
import "./bucket";
import "./object";
import "./group";
clear();
console.log(
  chalk.green(
    figlet.textSync("BNB Greenfield CLI", { horizontalLayout: "full" })
  )
);

program.option("-v, --version", "output the version number", () => {
  if (process.argv.indexOf("--version") > -1) {
    version();
  } else {
    console.log(`v${cliVersion}`);
  }
  process.exit(0);
});

export default program;
