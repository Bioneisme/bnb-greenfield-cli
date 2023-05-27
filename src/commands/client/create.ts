import { Client } from "@bnb-chain/greenfield-chain-sdk";
const client = Client.create(
  "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org",
  "5600"
);

console.log("work");

async function main() {
  // const account = await client.account.getAccount("0x1C893441AB6c1A75E01887087ea508bE8e07AAae");
  // console.log(account);
  const sp = await client.sp.getStoragePriceByTime(
    "0xE42B5AD90AfF1e8Ad90F76e02541A71Ca9D41A11"
  );
  console.log(sp);
}

main();
