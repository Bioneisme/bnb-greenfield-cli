import { version as cliVersion } from "../../package.json";

export const version = () => {
  console.log(`CLI: v${cliVersion} Contracts: v0 SDK: v0`);

  // console.log(
  //     `Endpoint: ${config.get("protocol")}://${config.get(
  //         "host"
  //     )}:${config.get("port")}`
  // );
  // console.log(`RPC Endpoint: ${config.get("rpc-url")}`);
  // console.log(`Network: ${config.get("network")}`);
  // console.log(`Endpoint: ${masa.config.apiUrl}`);
};
