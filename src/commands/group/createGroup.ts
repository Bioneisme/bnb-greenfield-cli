import { VisibilityType } from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/common";
import { GreenfieldClient } from "../../utils/sdk";
import {MsgCreateGroup, MsgUpdateBucketInfo} from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx";
import { IGetCreateObjectApproval } from "@bnb-chain/greenfield-chain-sdk/dist/esm/types";
import fs from "fs";
import { ISpInfo } from "@bnb-chain/greenfield-chain-sdk";
import {createFileStore} from "../../helpers/keystore";
import {config} from "../../utils/config";
import {parseBucketAndObject} from "../../utils/helpers";

// Create an object with the required properties

function getGroupNameByUrl(urlInfo:string): string {
    const bucketName: string = parseBucket(urlInfo);
    if (bucketName === "") {
        throw   new Error("fail to parse group name")
    }

    return bucketName
}
function parseBucket(urlPath: string): string {
    if (urlPath.includes("gnfd://")) {
        urlPath = urlPath.replace("gnfd://", "");
    }

    const splits = urlPath.split("/", 1);

    return splits[0];
}

export async function createGroup(
    urlPath:string
) {
    try {
        console.log("URL:"+urlPath)
        const store = await createFileStore();
        const publicKey = String(config.get("publicKey"));
        const privateKey = await store.getPrivateKeyData(
            String(config.get("privateKey")),
            ""
        );
        const parsedUrl = getGroupNameByUrl(urlPath)
        const bucketName = parseBucket(urlPath)
        const msg:MsgCreateGroup ={
            creator:publicKey,
            groupName:parsedUrl,
            members:[],
        }
        const group = await GreenfieldClient.client.group.createGroup(msg)
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
