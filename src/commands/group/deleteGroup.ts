import { GreenfieldClient } from "../../utils/sdk";
import {
    MsgDeleteGroup,
} from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx";

import {createFileStore} from "../../helpers/keystore";
import {config} from "../../utils/config";


export async function deleteGroup(
    groupName:string
) {
    try {
        const store = await createFileStore();
        const publicKey = String(config.get("publicKey"));
        const privateKey = await store.getPrivateKeyData(
            String(config.get("privateKey")),
            ""
        );
        const msg:MsgDeleteGroup = {
            operator:publicKey,
            groupName:groupName
        }
        const deleteGroup = await GreenfieldClient.client.group.deleteGroup(msg)
        const simulateInfo = await deleteGroup
            .simulate({
                denom: "BNB",
            })
            .catch(() => {});
        const broadcast = await deleteGroup.broadcast({
            denom: "BNB",
            gasLimit: Number(simulateInfo?.gasLimit || 2400),
            gasPrice: simulateInfo?.gasPrice || "5000000000000",
            payer: publicKey,
            granter: "",
            privateKey: String("0x" + privateKey),
        });
        console.log(broadcast);
    } catch (e) {
        console.error(`group deletion failed: ${e}`);
    }
}
