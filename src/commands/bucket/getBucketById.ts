import { GreenfieldClient } from "../../utils/sdk";

export async function getBucketById(bucketId: string) {
  try {
    const bucket = await GreenfieldClient.client.bucket.headBucketById(
      bucketId
    );
    console.log(bucket);
  } catch (e) {
    console.error(`get bucket by id failed: ${e}`);
  }
}
