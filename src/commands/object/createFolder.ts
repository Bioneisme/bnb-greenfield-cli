import { GreenfieldClient } from "../../utils/sdk";
import { IGetCreateObjectApproval } from "@bnb-chain/greenfield-chain-sdk/dist/esm/types";
import { ISpInfo } from "@bnb-chain/greenfield-chain-sdk";
import { parseBucketAndObject } from "../../helpers/parse";
import { config } from "../../utils/config";

export async function createFolder(urlPath: string) {
  try {
    // @ts-ignore
    const [bucketName, objectName] = parseBucketAndObject(urlPath);
    if (!bucketName || !objectName) {
      console.error(
        "URL is not in the correct format. Unable to parse bucket name and object name."
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

    const sp = await GreenfieldClient.client.sp.getStorageProviderInfo(address);
    if (sp == null) {
      console.error("SP not found");
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
    const blob = new Blob([""], { type: "text/xml" });
    const dummyFile = new File([blob], "dummyfile");
    const msg: IGetCreateObjectApproval = {
      bucketName: bucketName,
      objectName: "",
      creator: "ss",
      visibility: "VISIBILITY_TYPE_UNSPECIFIED",
      redundancyType: "REDUNDANCY_EC_TYPE",
      file: dummyFile,
      expectSecondarySpAddresses: [],
      spInfo: spInfo,
    };
    await GreenfieldClient.client.object.createFolder(msg);
  } catch (e) {
    console.error(`bucket creation failed: ${e}`);
  }
}
