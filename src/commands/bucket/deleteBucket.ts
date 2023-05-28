import { GreenfieldClient } from "../../utils/sdk";
import { config } from "../../utils/config";
import { getPrivateKey } from "../../helpers/password";

export async function deleteBucket(bucketName: string) {
  try {
    if (!/^[a-z0-9,-]+$/.test(bucketName)) {
      console.error(
        "bucket name can only include lowercase letters, numbers, commas and hyphen"
      );
      return;
    }
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
    const bucket = await GreenfieldClient.client.bucket.deleteBucket({
      bucketName,
      operator: address,
    });

    const simulateInfo = await bucket
      .simulate({
        denom: "BNB",
      })
      .catch(() => {});

    const privateKey = await getPrivateKey();

    const broadcast = await bucket.broadcast({
      denom: "BNB",
      gasLimit: Number(simulateInfo?.gasLimit || 2400),
      gasPrice: simulateInfo?.gasPrice || "5000000000000",
      payer: publicKey,
      granter: "",
      privateKey: String("0x" + privateKey),
    });

    console.log(broadcast);
  } catch (e) {
    console.error(`bucket deletion failed: ${e}`);
  }
}
