import {GreenfieldClient} from "../../utils/sdk";
import { QueryGetPaymentAccountRequest } from '@bnb-chain/greenfield-cosmos-types/greenfield/payment/query';

export async function getPaymentAccount(acc: QueryGetPaymentAccountRequest) {
    try {
        const account = await GreenfieldClient.client.account.getPaymentAccount(acc);
        console.log(account);
    } catch (e) {
throw e;
    }
}