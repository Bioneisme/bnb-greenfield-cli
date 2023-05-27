import Conf from "conf";

/*
macOS: ~/Library/Preferences/.greenfield/config.json
Windows: %APPDATA%\.greenfield\config.json
Linux: ~/.config/.greenfield/config.json (or $XDG_CONFIG_HOME/.greenfield/config.json)
 */

export const config = new Conf({
  projectName: ".greenfield",
  configName: "config",
  projectSuffix: "",
  schema: {
    cookie: {
      type: "string",
      default: undefined,
    },
    environment: {
      type: "string",
      default: "dev",
    },
    rpcUrl: {
      type: "string",
      format: "uri",
      default: "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org",
    },
    chainId: {
      type: "string",
      default: "5600",
    },
    verbose: {
      type: "boolean",
      default: false,
    },
    privateKey: {
      type: "string",
    },
    publicKey: {
      type: "string",
    },
  },
});
