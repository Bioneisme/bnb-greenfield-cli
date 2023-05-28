import { GreenfieldClient } from "../../utils/sdk";
import { config } from "../../utils/config";

export async function headMember(member: string, groupName: string) {
  try {
    const publicKey = String(config.get("publicKey"));
    const action = await GreenfieldClient.client.group.headGroupMember(
      groupName,
      publicKey,
      member
    );
    console.log(action);
  } catch (e) {
    console.error(`group creation failed: ${e}`);
  }
}
