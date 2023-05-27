import {VisibilityType} from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/common";
import { GreenfieldClient } from "../../utils/sdk";
import {MsgUpdateBucketInfo} from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx";
import {IGetCreateObjectApproval} from "@bnb-chain/greenfield-chain-sdk/dist/esm/types";
import fs from 'fs';
import {ISpInfo} from "@bnb-chain/greenfield-chain-sdk";

// Create an object with the required properties

export async function putObject(bucketName:string, visibility:string, filepath:string ) {
    try {
        const fileData = fs.readFileSync(filepath);
        let visibilityType: keyof typeof VisibilityType
        switch (visibility){
            case "public-read":
                visibilityType ="VISIBILITY_TYPE_PUBLIC_READ"
                break
            case "unspecified" :
                visibilityType = "VISIBILITY_TYPE_UNSPECIFIED"
                break
            case "private":
                visibilityType = "VISIBILITY_TYPE_PRIVATE"
                break
            default:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                visibilityType = "UNRECOGNIZED"
                break
        }


        const blob = new Blob([fileData], { type: 'text/xml' });
        const file = new File([blob], filepath);

        //TODO fix this
        const sp =await GreenfieldClient.client.sp.getStorageProviderInfo("https://gnfd-testnet-sp-3.bnbchain.org")
        if(sp==null){
            console.log("SP not found")
            return
        }
        const spInfo:ISpInfo = {
            endpoint: sp.endpoint,
            secondarySpAddresses:[sp.gcAddress,sp.approvalAddress,sp.operatorAddress],
            sealAddress:sp.sealAddress,
            primarySpAddress:sp.fundingAddress
        }

        const msg:IGetCreateObjectApproval= {
            bucketName:bucketName,
            objectName:"",
            creator:"ss",
            visibility:visibilityType,
            redundancyType:"REDUNDANCY_EC_TYPE",
            file: file,
            expectSecondarySpAddresses:[],
            spInfo:spInfo
        }
        await GreenfieldClient.client.object.createObject(msg)
    } catch (e) {
        console.error(`bucket creation failed: ${e}`);
    }
}