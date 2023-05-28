import { VisibilityType } from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/common";
import { GreenfieldClient } from "../../utils/sdk";
import {
    MsgCreateGroup,
    MsgUpdateBucketInfo,
    MsgUpdateGroupMember
} from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx";
import { IGetCreateObjectApproval } from "@bnb-chain/greenfield-chain-sdk/dist/esm/types";
import fs from "fs";
import { ISpInfo } from "@bnb-chain/greenfield-chain-sdk";
import {createFileStore} from "../../helpers/keystore";
import {config} from "../../utils/config";
import {parseBucketAndObject} from "../../utils/helpers";

// Create an object with the required properties

export async function updateGroupMember(
    member:string,
    groupName:string
) {
    try {
        const store = await createFileStore();
        const publicKey = String(config.get("publicKey"));
        const privateKey = await store.getPrivateKeyData(
            String(config.get("privateKey")),
            ""
        );
        const msg:MsgUpdateGroupMember={
            operator:publicKey,
            groupOwner:publicKey,
            groupName:groupName,
            membersToAdd:[member],
            membersToDelete:[]
        }
        const action = await GreenfieldClient.client.group.updateGroupMember(msg)
        const simulateInfo = await action
            .simulate({
                denom: "BNB",
            })
            .catch(() => {});
        const broadcast = await action.broadcast({
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
