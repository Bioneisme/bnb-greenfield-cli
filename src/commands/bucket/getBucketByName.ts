import { GreenfieldClient } from "../../utils/sdk";

export async function getBucketByName(bucketName: string) {
  try {
    const bucket = await GreenfieldClient.client.bucket.headBucket(bucketName);
    console.log(bucket);
  } catch (e) {
    console.error(`get bucket by name failed: ${e}`);
  }
}
