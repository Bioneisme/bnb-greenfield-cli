import Web3Accounts from "web3-eth-accounts";
import { config } from "../../utils/config";

export async function createWeb3Account() {
  try {
    const web3 = new Web3Accounts(String(config.get("rpcUrl")));
    const newAccount = web3.create();
    console.log(newAccount);
  } catch (e) {
    console.error(`create web3 account failed: ${e}`);
  }
}
