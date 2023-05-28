import { VisibilityType } from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/common";
import { GreenfieldClient } from "../../utils/sdk";
import { MsgUpdateBucketInfo } from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx";
import { IGetCreateObjectApproval } from "@bnb-chain/greenfield-chain-sdk/dist/esm/types";
import fs from "fs";
import { ISpInfo } from "@bnb-chain/greenfield-chain-sdk";
import { createFileStore } from "../../helpers/keystore";
import { config } from "../../utils/config";
import { parseBucketAndObject } from "../../utils/helpers";
import {getPrivateKey} from "../../helpers/password";

// Create an object with the required properties

export async function putObject(
  url: string,
  visibility: string,
  localFilepath: string
) {
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
    console.log(
      `bucketName=${url} visibility=${visibility} , filepath=${localFilepath}`
    );
    // @ts-ignore
    const [bucketName, filePath] = parseBucketAndObject(url);
    let visibilityType: keyof typeof VisibilityType;
    switch (visibility) {
      case "public-read":
        visibilityType = "VISIBILITY_TYPE_PUBLIC_READ";
        break;
      case "unspecified":
        visibilityType = "VISIBILITY_TYPE_UNSPECIFIED";
        break;
      case "private":
        visibilityType = "VISIBILITY_TYPE_PRIVATE";
        break;
      default:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        visibilityType = "UNRECOGNIZED";
        break;
    }

    const fileData = await fs.promises.readFile(localFilepath);
    const file = new Blob([fileData], { type: "text/xml" });

    const sp = await GreenfieldClient.client.sp.getStorageProviderInfo(
      address
    );

    if (sp == null) {
      console.log("SP not found");
      return;
    }
    const spInfo: ISpInfo = {
      endpoint: sp.endpoint,
      secondarySpAddresses: [
        sp.gcAddress,
        sp.approvalAddress,
        sp.operatorAddress,
      ],
      sealAddress: sp.sealAddress,
      primarySpAddress: sp.fundingAddress,
    };

    const msg: IGetCreateObjectApproval = {
      bucketName: bucketName,
      objectName: "file",
      creator: publicKey,
      visibility: visibilityType,
      redundancyType: "REDUNDANCY_EC_TYPE",
      file: file as File,
      expectSecondarySpAddresses: [],
      spInfo: spInfo,
    };
    const obj = await GreenfieldClient.client.object.createObject(msg);
    const simulateInfo = await obj
      .simulate({
        denom: "BNB",
      })
      .catch(() => {});

    const privateKey = await getPrivateKey();

    const broadcast = await obj.broadcast({
      denom: "BNB",
      gasLimit: Number(simulateInfo?.gasLimit || 2400),
      gasPrice: simulateInfo?.gasPrice || "5000000000000",
      payer: publicKey,
      granter: "",
      privateKey: String("0x" + privateKey),
    });
    console.log(broadcast);
  } catch (e) {
    console.error(`putting object failed: ${e}`);
  }
}
