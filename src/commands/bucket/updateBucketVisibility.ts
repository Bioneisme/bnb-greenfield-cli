import { VisibilityType } from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/common";
import { GreenfieldClient } from "../../utils/sdk";
import { MsgUpdateBucketInfo } from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx";
import { config } from "../../utils/config";
import { getPrivateKey } from "../../helpers/password";

// Create an object with the required properties

export async function updateBucketVisibility(
  visibility: string,
  bucketName: string
) {
  try {
    let visibilityType: VisibilityType;
    switch (visibility) {
      case "public-read":
        visibilityType = VisibilityType.VISIBILITY_TYPE_PUBLIC_READ;
        break;
      case "unspecified":
        visibilityType = VisibilityType.VISIBILITY_TYPE_UNSPECIFIED;
        break;
      case "private":
        visibilityType = VisibilityType.VISIBILITY_TYPE_PRIVATE;
        break;
      default:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        visibilityType = VisibilityType.UNRECOGNIZED;
        break;
    }
    const publicKey = String(config.get("publicKey"));
    if (!publicKey || publicKey === "undefined") {
      console.error(
        "public key is required. Please set it in the system config"
      );
      return;
    }
    const spAddress = String(config.get("spAddress"));
    if (!spAddress || spAddress === "undefined") {
      console.error(
        "spAddress is required. Please set it in the system config"
      );
      return;
    }
    const msg: MsgUpdateBucketInfo = {
      paymentAddress: publicKey,
      operator: spAddress,
      bucketName: bucketName,
      visibility: visibilityType,
    };
    const bucket = await GreenfieldClient.client.bucket.updateBucketInfo(msg);

    const simulateInfo = await bucket
      .simulate({
        denom: "BNB",
      })
      .catch(() => {});

    const privateKey = await getPrivateKey();

    const broadcast = await bucket.broadcast({
      denom: "BNB",
      gasLimit: Number(simulateInfo?.gasLimit || 1200),
      gasPrice: simulateInfo?.gasPrice || "5000000000000",
      payer: publicKey,
      granter: "",
      privateKey: String("0x" + privateKey),
    });

    console.log(broadcast);
  } catch (e) {
    console.error(`bucket creation failed: ${e}`);
  }
}
