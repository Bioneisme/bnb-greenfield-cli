import {GreenfieldClient} from "../../utils/sdk";

export async function transfer(fromAddress: string, toAddress: string, amount: string) {
    try {
        const transferTx = await GreenfieldClient.client.account.transfer({
            fromAddress,
            toAddress,
            amount: [{
                denom: "BNB",
                amount
            }]
        })
        console.log(transferTx);
        const simulateInfo = await transferTx.simulate({
            denom: 'BNB'
        });
        const broadcast = await transferTx.broadcast({
            denom: 'BNB',
            gasLimit: Number(simulateInfo.gasLimit),
            gasPrice: simulateInfo.gasPrice,
            payer: fromAddress,
            granter: '',
            privateKey: '0x130fba69739a1b86a71fbff83300184171fecc1f156424b0f0622a806672cd09',
        });
        console.log(broadcast);
    } catch (e) {
        console.error(e);
    }
}