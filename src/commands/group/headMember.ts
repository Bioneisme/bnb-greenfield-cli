import { GreenfieldClient } from "../../utils/sdk";
import {createFileStore} from "../../helpers/keystore";
import {config} from "../../utils/config";

// Create an object with the required properties

export async function headMember(
    member:string,
    groupName:string
) {
    try {
        const store = await createFileStore();
        const publicKey = String(config.get("publicKey"));
        const action = await GreenfieldClient.client.group.headGroupMember(groupName, publicKey, member)
        console.log(`member with ${member} has been headed`)
    } catch (e) {
        console.error(`group creation failed: ${e}`);
    }
}
