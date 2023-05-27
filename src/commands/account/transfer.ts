import { GreenfieldClient } from "../../utils/sdk";

export async function transfer(
  fromAddress: string,
  toAddress: string,
  amount: string
) {
  try {
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
    console.log(transferTx);
    const simulateInfo = await transferTx.simulate({
      denom: "BNB",
    });
    const broadcast = await transferTx.broadcast({
      denom: "BNB",
      gasLimit: Number(simulateInfo.gasLimit),
      gasPrice: simulateInfo.gasPrice,
      payer: fromAddress,
      granter: "",
      privateKey: "", // TODO: add private key
    });
    console.log(broadcast);
  } catch (e) {
    console.error(e);
  }
}
