import { program } from "commander";
import { createBucket } from "../commands/bucket/createBucket";
import { updateBucketVisibility } from "../commands/bucket/updateBucketVisibility";
import { updateChargeQuota } from "../commands/bucket/updateChargeQuota";

const bucket = program.command("bucket").description("bucket");

bucket
  .command("create <bucketName>")
  .description("creates a bucket")
  .action(async (bucketName) => {
    await createBucket(bucketName);
  });

bucket
  .command("update --chargedQuota=<chargedQuota> <bucketName>")
  .description("update charged quota or payment address")
  .action(async (chargedQuota, bucketName) => {
    await updateChargeQuota(chargedQuota, bucketName);
  });

bucket
  .command("update --visibility=<visibility> <bucketName>")
  .description("update bucket visibility")
  .action(async (visibility, bucketName) => {
    await updateBucketVisibility(visibility, bucketName);
  });

export default bucket;
