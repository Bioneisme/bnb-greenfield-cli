import { config } from "../../utils/config";
import { GreenfieldClient } from "../../utils/sdk";
import { MsgGrantAllowance } from "@bnb-chain/greenfield-cosmos-types/cosmos/feegrant/v1beta1/tx";
import { getPrivateKey } from "../../helpers/password";

export async function grantAllowance(address: string) {
  try {
    const publicKey = String(config.get("publicKey"));
    if (!publicKey || publicKey === "undefined") {
      console.error(
        "public key is required. Please set it in the system config"
      );
      return;
    }

    const res: MsgGrantAllowance = {
      granter: publicKey,
      grantee: address,
    };
    const allowence = await GreenfieldClient.client.feegrant.grantAllowance(
      res
    );

    const simulateInfo = await allowence
      .simulate({
        denom: "BNB",
      })
      .catch(() => {});

    const privateKey = await getPrivateKey();

    const broadcast = await allowence.broadcast({
      denom: "BNB",
      gasLimit: Number(simulateInfo?.gasLimit || 2400),
      gasPrice: simulateInfo?.gasPrice || "5000000000000",
      payer: publicKey,
      granter: "",
      privateKey: String("0x" + privateKey),
    });

    console.log(broadcast);
  } catch (e) {
    console.error(e);
  }
}
