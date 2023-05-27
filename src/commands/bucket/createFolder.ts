import { GreenfieldClient } from "../../utils/sdk";
import {MsgUpdateBucketInfo} from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx";
import {IGetCreateObjectApproval} from "@bnb-chain/greenfield-chain-sdk/dist/esm/types";
import fs from 'fs';
import {ISpInfo} from "@bnb-chain/greenfield-chain-sdk";
import {parseBucketAndObject} from "../../utils/helpers";

// Create an object with the required properties



export async function createFolder(urlPath:string ) {
    try {
        // @ts-ignore
        const [bucketName, objectName] = parseBucketAndObject(urlPath);
        if(!bucketName || !objectName){
            throw new Error("URL is not in the correct format. Unable to parse bucket name and object name.")
        }


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
        const blob = new Blob([""], { type: 'text/xml' });
        const dummyFile = new File([blob], "dummyfile");
        const msg:IGetCreateObjectApproval= {
            bucketName:bucketName,
            objectName:"",
            creator:"ss",
            visibility:"VISIBILITY_TYPE_UNSPECIFIED",
            redundancyType:"REDUNDANCY_EC_TYPE",
            file: dummyFile,
            expectSecondarySpAddresses:[],
            spInfo:spInfo
        }
        await GreenfieldClient.client.object.createFolder(
            msg
        )
    } catch (e) {
        console.error(`bucket creation failed: ${e}`);
    }
}