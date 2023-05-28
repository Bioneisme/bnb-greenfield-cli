import { VisibilityType } from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/common";
import { GreenfieldClient } from "../../utils/sdk";
import { MsgUpdateBucketInfo } from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx";
import { Long } from "@bnb-chain/greenfield-chain-sdk";
import { UInt64Value } from "@bnb-chain/greenfield-cosmos-types/greenfield/common/wrapper";
import { getPrivateKey } from "../../helpers/password";
import { config } from "../../utils/config";

// Create an object with the required properties

export async function updateChargeQuota(
  chargeQuota: string,
  bucketName: string
) {
  try {
    const num: UInt64Value = {
      value: Long.fromString(chargeQuota),
    };
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
      chargedReadQuota: num,
      visibility: VisibilityType.VISIBILITY_TYPE_INHERIT,
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
    console.error(`updateChargeQuota failed: ${e}`);
  }
}
