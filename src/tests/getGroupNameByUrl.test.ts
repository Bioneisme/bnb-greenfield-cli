import { getGroupNameByUrl } from "../commands/group/createGroup";

describe("getGroupNameByUrl", () => {
  it("should return the group name", () => {
    const urlInfo = "gnfd://group1";
    const groupName = getGroupNameByUrl(urlInfo);
    expect(groupName).toEqual("group1");
  });
});
