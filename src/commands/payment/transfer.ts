import { GreenfieldClient } from "../../utils/sdk";
import { config } from "../../utils/config";
import web3Utils from "web3-utils";
import { createFileStore } from "../../helpers/keystore";
import { getPrivateKey } from "../../helpers/password";

export async function transfer(toAddress: string, amount: string) {
  try {
    const fromAddress = String(config.get("publicKey"));
    // TODO: вынести валидацию в отдельный метод
    if (!web3Utils.isAddress(fromAddress)) {
      console.error(`Public key '${fromAddress}' is not a valid address`);
      return;
    }
    if (!web3Utils.isAddress(toAddress)) {
      console.error(`Public key '${toAddress}' is not a valid address`);
      return;
    }
    if (Number(amount) <= 0) {
      console.error(`Amount '${amount}' is not a valid amount`);
      return;
    }

    const transferTx = await GreenfieldClient.client.account.transfer({
      fromAddress,
      toAddress,
      amount: [
        {
          denom: "BNB",
          amount,
        },
      ],
    });
    const simulateInfo = await transferTx.simulate({
      denom: "BNB",
    });
    const privateKey = await getPrivateKey();

    const broadcast = await transferTx.broadcast({
      denom: "BNB",
      gasLimit: Number(simulateInfo.gasLimit),
      gasPrice: simulateInfo.gasPrice,
      payer: fromAddress,
      granter: "",
      privateKey: String("0x" + privateKey),
    });

    console.log(broadcast);
  } catch (e) {
    console.error(e);
  }
}
