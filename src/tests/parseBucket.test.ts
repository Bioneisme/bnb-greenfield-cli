import { parseBucket } from "../commands/group/createGroup";

describe("parseBucket", () => {
  it("should return the bucket name", () => {
    const urlInfo = "gnfd://group1";
    const bucketName = parseBucket(urlInfo);
    expect(bucketName).toEqual("group1");
  });
});
