import { program } from "commander";
import { createGroup } from "../commands/group/createGroup";
import { updateGroupMember } from "../commands/group/updateGroupMember";
import { headMember } from "../commands/group/headMember";
import { deleteGroup } from "../commands/group/deleteGroup";

const group = program.command("group").description("group operations");

group
  .command("create <groupName>")
  .description("create group")
  .action(async (groupName) => {
    await createGroup(groupName);
  });

group
  .command("update-member <memberAddress> <groupName>")
  .description("update group member")
  .action(async (memberAddress, groupName) => {
    await updateGroupMember(memberAddress, groupName);
  });
group
  .command("head <memberAddress> <groupName>")
  .description("heads member")
  .action(async (memberAddress, groupName) => {
    await headMember(memberAddress, groupName);
  });
group
  .command("delete <groupName>")
  .description("delete group")
  .action(async (groupName) => {
    await deleteGroup(groupName);
  });

export default group;
