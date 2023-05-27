import { v4 as uuid } from "uuid";
import { createFileStore } from "../../helpers/keystore";
import { config } from "../../utils/config";
import web3Utils from "web3-utils";
import Web3Accounts from "web3-eth-accounts";

export async function changePrivateKey(
  publicKey: string,
  privateKey: string,
  password: string = ""
) {
  try {
    if (!web3Utils.isAddress(publicKey)) {
      console.error(`Public key '${publicKey}' is not a valid address`);
      return;
    }
    const web3 = new Web3Accounts(String(config.get("rpcUrl")));
    const acc = web3.privateKeyToAccount(privateKey);
    if (acc.address !== publicKey) {
      console.error(`Public key '${publicKey}' does not match private key`);
      return;
    }
    const store = await createFileStore();
    const keyId = uuid();
    await store.saveKey(keyId, password, privateKey, publicKey);

    config.set("publicKey", publicKey);
    config.set("privateKey", keyId);

    console.log(`Keys changed successfully. Key ID: ${keyId}`);
  } catch (e) {
    console.error(`Change keys failed: ${e}`);
  }
}
