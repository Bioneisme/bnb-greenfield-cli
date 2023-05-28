import {VisibilityType} from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/common";
import {GreenfieldClient} from "../../utils/sdk";
import {MsgUpdateBucketInfo} from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx";
import {Long} from "@bnb-chain/greenfield-chain-sdk";
import {UInt64Value} from "@bnb-chain/greenfield-cosmos-types/greenfield/common/wrapper";

// Create an object with the required properties

    export async function updateChargeQuota(chargeQuota:string,bucketName:string) {
    try {
        const num:UInt64Value ={
            value: Long.fromString(chargeQuota)
        }
        const msg: MsgUpdateBucketInfo={
            paymentAddress: "",
            operator:"",
            bucketName:bucketName,
            chargedReadQuota:num,
            visibility:VisibilityType.VISIBILITY_TYPE_INHERIT
        }
        await GreenfieldClient.client.bucket.updateBucketInfo(
            msg
        )
        console.log("Bucket was sucessfully updated")
    } catch (e) {
        console.error(`bucket creation failed: ${e}`);
    }
}