import {GreenfieldClient} from "../../utils/sdk";

export async function getAccount(address: string) {
    try {
        const account = await GreenfieldClient.client.account.getAccount(address);
        console.log(account);
    } catch (e) {
        console.error(`Account '${address}' not found: ${e}`);
        throw e;
    }
}