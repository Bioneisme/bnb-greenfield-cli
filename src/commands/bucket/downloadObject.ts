import { GreenfieldClient } from "../../utils/sdk";
import {MsgUpdateBucketInfo} from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx";
import {IGetCreateObjectApproval} from "@bnb-chain/greenfield-chain-sdk/dist/esm/types";
import fs from 'fs';
import {ISpInfo} from "@bnb-chain/greenfield-chain-sdk";
import {parseBucketAndObject} from "../../utils/helpers";
import {IGetObjectPropsType} from "@bnb-chain/greenfield-chain-sdk/dist/esm/types/storage";
import {File} from "buffer";

// Create an object with the required properties



export async function downloadObject(urlPath:string, downloadToFilePath:string ) {
    try {
        // @ts-ignore
        const [bucketName, objectName] = parseBucketAndObject(urlPath);
        const objectPropsType:IGetObjectPropsType={
            bucketName:bucketName,
            objectName:objectName,
        }
        const objToDownload = await GreenfieldClient.client.object.getObject(objectPropsType)
        // @ts-ignore
        const newFile = new File([objToDownload.body],objectName)
        const fileContent = await newFile.arrayBuffer();
        fs.writeFileSync(downloadToFilePath, Buffer.from(fileContent));
        console.log(`File saved successfully at "${downloadToFilePath}"`);
    } catch (e) {
        console.error(`bucket creation failed: ${e}`);
    }
}