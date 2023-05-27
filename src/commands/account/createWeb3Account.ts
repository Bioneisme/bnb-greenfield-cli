import Web3Accounts from "web3-eth-accounts";

export async function createWeb3Account() {
  try {
    const web3 = new Web3Accounts(
      "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org"
    );
    const newAccount = web3.create();
    console.log(newAccount);
  } catch (e) {
    console.error(`create web3 account failed: ${e}`);
  }
}
