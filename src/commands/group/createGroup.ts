import { GreenfieldClient } from "../../utils/sdk";
import { MsgCreateGroup } from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx";
import { createFileStore } from "../../helpers/keystore";
import { config } from "../../utils/config";
import { getPrivateKey } from "../../helpers/password";

// Create an object with the required properties

export function getGroupNameByUrl(urlInfo: string): string {
  const bucketName: string = parseBucket(urlInfo);
  if (bucketName === "") {
    throw new Error("fail to parse group name");
  }

  return bucketName;
}

export function parseBucket(urlPath: string): string {
  if (urlPath.includes("gnfd://")) {
    urlPath = urlPath.replace("gnfd://", "");
  }

  const splits = urlPath.split("/", 1);

  return splits[0];
}

export async function createGroup(urlPath: string) {
  try {
    const publicKey = String(config.get("publicKey"));
    const privateKey = await getPrivateKey();
    const parsedUrl = getGroupNameByUrl(urlPath);
    const msg: MsgCreateGroup = {
      creator: publicKey,
      groupName: parsedUrl,
      members: [],
    };
    const group = await GreenfieldClient.client.group.createGroup(msg);
    const simulateInfo = await group
      .simulate({
        denom: "BNB",
      })
      .catch(() => {});
    const broadcast = await group.broadcast({
      denom: "BNB",
      gasLimit: Number(simulateInfo?.gasLimit || 2400),
      gasPrice: simulateInfo?.gasPrice || "5000000000000",
      payer: publicKey,
      granter: "",
      privateKey: String("0x" + privateKey),
    });
    console.log(broadcast);
  } catch (e) {
    console.error(`group creation failed: ${e}`);
  }
}
