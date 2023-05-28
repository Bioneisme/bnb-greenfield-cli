import { GreenfieldClient } from "../../utils/sdk";
import {
  IGetCreateBucketApproval,
  ISpInfo,
} from "@bnb-chain/greenfield-chain-sdk";
import { config } from "../../utils/config";
import { createFileStore } from "../../helpers/keystore";

export async function createBucket(address: string, bucketName: string) {
  try {
    if (!/^[a-z0-9,-]+$/.test(bucketName)) {
      console.error(
        "bucket name can only include lowercase letters, numbers, commas and hyphen"
      );
      return;
    }
    const store = await createFileStore();
    const publicKey = String(config.get("publicKey"));

    const sp = await GreenfieldClient.client.sp.getStorageProviderInfo(address);
    if (sp != null) {
      console.log(sp);
      const spInfo: ISpInfo = {
        endpoint: sp.endpoint,
        sealAddress: sp.sealAddress,
        primarySpAddress: sp.operatorAddress,
        secondarySpAddresses: [],
      };
      const bucketApproval: IGetCreateBucketApproval = {
        bucketName: bucketName,
        creator: publicKey,
        visibility: "VISIBILITY_TYPE_PUBLIC_READ",
        chargedReadQuota: "0",
        spInfo: spInfo,
      };
      const bucket = await GreenfieldClient.client.bucket.createBucket(
        bucketApproval
      );
      const simulateInfo = await bucket
        .simulate({
          denom: "BNB",
        })
        .catch(() => {});

      const privateKey = await store.getPrivateKeyData(
        String(config.get("privateKey")),
        ""
      );

      const broadcast = await bucket.broadcast({
        denom: "BNB",
        gasLimit: Number(simulateInfo?.gasLimit || 2400),
        gasPrice: simulateInfo?.gasPrice || "5000000000000",
        payer: publicKey,
        granter: "",
        privateKey: String("0x" + privateKey),
      });

      console.log(broadcast);
    }
  } catch (e) {
    console.error(`bucket creation failed: ${e}`);
  }
}
