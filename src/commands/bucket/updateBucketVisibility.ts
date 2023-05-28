import { VisibilityType } from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/common";
import { GreenfieldClient } from "../../utils/sdk";
import { MsgUpdateBucketInfo } from "@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx";

// Create an object with the required properties

export async function updateBucketVisibility(
  visibility: string,
  bucketName: string
) {
  try {
    let visibilityType: VisibilityType;
    switch (visibility) {
      case "public-read":
        visibilityType = VisibilityType.VISIBILITY_TYPE_PUBLIC_READ;
        break;
      case "unspecified":
        visibilityType = VisibilityType.VISIBILITY_TYPE_UNSPECIFIED;
        break;
      case "private":
        visibilityType = VisibilityType.VISIBILITY_TYPE_PRIVATE;
        break;
      default:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        visibilityType = VisibilityType.UNRECOGNIZED;
        break;
    }
    const msg: MsgUpdateBucketInfo = {
      paymentAddress: "",
      operator: "",
      bucketName: bucketName,
      visibility: visibilityType,
    };
    await GreenfieldClient.client.bucket.updateBucketInfo(msg);
    console.log("Bucket was sucessfully updated");
  } catch (e) {
    console.error(`bucket creation failed: ${e}`);
  }
}
