import { config } from "../../utils/config";
import { MsgMirrorObject } from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx";
import { GreenfieldClient } from "../../utils/sdk";
import { getPrivateKey } from "../../helpers/password";

export async function mirrorObject(id: string) {
  try {
    const publicKey = String(config.get("publicKey"));
    if (!publicKey || publicKey === "undefined") {
      console.error(
        "public key is required. Please set it in the system config"
      );
      return;
    }

    const address = String(config.get("spAddress"));
    if (!address || address === "undefined") {
      console.error(
        "storage provider address is required. Please set it in the system config"
      );
      return;
    }
    const msg: MsgMirrorObject = {
      operator: publicKey,
      id,
    };
    const res = await GreenfieldClient.client.crosschain.mirrorObject(msg);
    const simulateInfo = await res
      .simulate({
        denom: "BNB",
      })
      .catch(() => {});

    const privateKey = await getPrivateKey();

    const broadcast = await res.broadcast({
      denom: "BNB",
      gasLimit: Number(simulateInfo?.gasLimit || 2400),
      gasPrice: simulateInfo?.gasPrice || "5000000000000",
      payer: publicKey,
      granter: "",
      privateKey: String("0x" + privateKey),
    });

    console.log(broadcast);
  } catch (e) {
    console.error(`mirror object failed: ${e}`);
  }
}
