import { GreenfieldClient } from "../../utils/sdk";
import { MsgCreatePaymentAccount } from "@bnb-chain/greenfield-cosmos-types/greenfield/payment/tx";
import { config } from "../../utils/config";
import { createFileStore } from "../../helpers/keystore";
import web3Utils from "web3-utils";

export async function createPaymentAccount() {
  try {
    const store = await createFileStore();
    const publicKey = String(config.get("publicKey"));
    if (!web3Utils.isAddress(publicKey)) {
      console.error(`Public key '${publicKey}' is not a valid address`);
      return;
    }
    const msg: MsgCreatePaymentAccount = {
      creator: publicKey,
    };
    const paymentTx =
      await GreenfieldClient.client.account.createPaymentAccount(msg);

    const simulateInfo = await paymentTx.simulate({
      denom: "BNB",
    });
    const privateKey = await store.getPrivateKeyData(
      String(config.get("privateKey")),
      ""
    );
    const broadcast = await paymentTx
      .broadcast({
        denom: "BNB",
        gasLimit: Number(simulateInfo.gasLimit),
        gasPrice: simulateInfo.gasPrice,
        payer: publicKey,
        granter: "",
        privateKey: String("0x" + privateKey),
      })
      .catch((e) => {
        console.error(e);
      });

    console.log(broadcast);
  } catch (e) {
    console.error(`payment account creation failed: ${e}`);
  }
}
