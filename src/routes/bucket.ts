import { program } from "commander";
import {createDeposit} from "../commands/payment/createPayment";
import {withdraw} from "../commands/payment/withdraw";
import {createBucket} from "../commands/bucket/createBucket";
import {updateBucketVisibility} from "../commands/bucket/updateBucketVisibility";
import {putObject} from "../commands/bucket/putObject";
import {updateChargeQuota} from "../commands/bucket/updateChargeQuota";

const bucket = program.command("bucket").description("bucket");



bucket.command("create <spAddress> <accountAddress> <bucketName>")
    .description("creates a bucket")
    .action(async (spAddress,accountAddress, bucketName) => {
        await createBucket(spAddress,accountAddress,bucketName)
    });

bucket.command("update --chargedQuota=<chargedQuota> <bucketName>")
    .description("update charged quota or payment address")
    .action(async (chargedQuota,bucketName)=>{
        await updateChargeQuota(chargedQuota,bucketName)
    })

bucket.command("update --visibility=<visibility> <bucketName>")
    .description("update bucket visibility")
    .action(async (visibility,bucketName)=>{
        await updateBucketVisibility(visibility,bucketName)
    })



export default bucket;
