import { program } from "commander";
import { createBucket } from "../commands/bucket/createBucket";
import { updateBucketVisibility } from "../commands/bucket/updateBucketVisibility";
import { updateChargeQuota } from "../commands/bucket/updateChargeQuota";
import { deleteBucket } from "../commands/bucket/deleteBucket";
import { getBucketById } from "../commands/bucket/getBucketById";
import { getBucketByName } from "../commands/bucket/getBucketByName";

const bucket = program.command("bucket").description("bucket");

bucket
  .command("create <bucketName>")
  .description("creates a bucket")
  .action(async (bucketName) => {
    await createBucket(bucketName);
  });

bucket
  .command("delete <bucketName>")
  .description("delete a bucket")
  .action(async (bucketName) => {
    await deleteBucket(bucketName);
  });

bucket
  .command("get-id <bucketId>")
  .description("get a bucket by id")
  .action(async (bucketId) => {
    await getBucketById(bucketId);
  });

bucket
  .command("get-name <bucketName>")
  .description("get a bucket by name")
  .action(async (bucketName) => {
    await getBucketByName(bucketName);
  });

bucket
  .command("update-quota <chargedQuota> <bucketName>")
  .description("update charged quota or payment address")
  .action(async (chargedQuota, bucketName) => {
    await updateChargeQuota(chargedQuota, bucketName);
  });

bucket
  .command("update-visibility <visibility> <bucketName>")
  .description("update bucket visibility (public-read, unspecified, private)")
  .action(async (visibility, bucketName) => {
    await updateBucketVisibility(visibility, bucketName);
  });

export default bucket;
