import { GreenfieldClient } from "../../utils/sdk";
import {IGetCreateBucketApproval, ISpInfo} from "@bnb-chain/greenfield-chain-sdk";
import {VisibilityType} from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/common";
import {getStorageProviderInfo} from "../sp/getStorageProviderInfo";

// Create an object with the required properties

export async function createBucket(address:string,accountAddress:string, bucketName:string) {
    try {
        const sp = await GreenfieldClient.client.sp.getStorageProviderInfo(
            address
        );
        if(sp!=null){
            const spInfo:ISpInfo = {
                endpoint:sp.endpoint,
                primarySpAddress:sp.fundingAddress,
                sealAddress:sp.sealAddress,
                secondarySpAddresses:[],
            }
            const bucketApproval:IGetCreateBucketApproval = {
                bucketName:bucketName,
                creator:accountAddress,
                visibility: "VISIBILITY_TYPE_UNSPECIFIED",
                chargedReadQuota:"0.1",
                spInfo: spInfo,
            }
            await GreenfieldClient.client.bucket.createBucket(
                bucketApproval
            )
            console.log(`bucket created`);
        }else{
            const spArr = await GreenfieldClient.client.sp.getStorageProviders()
            const sp =spArr[Math.floor(Math.random() * spArr.length)]
            const spInfo:ISpInfo = {
                endpoint:sp.endpoint,
                primarySpAddress:sp.fundingAddress,
                sealAddress:sp.sealAddress,
                secondarySpAddresses:[],
            }
            const bucketApproval:IGetCreateBucketApproval = {
                bucketName:bucketName,
                creator:accountAddress,
                visibility: "VISIBILITY_TYPE_UNSPECIFIED",
                chargedReadQuota:"",
                spInfo: spInfo,
            }
            await GreenfieldClient.client.bucket.createBucket(
                bucketApproval
            )
            console.log(`bucket created`);
        }

    } catch (e) {
        console.error(`bucket creation failed: ${e}`);
    }
}