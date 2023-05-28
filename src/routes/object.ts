import { putObject } from "../commands/object/putObject";
import { program } from "commander";
import { createFolder } from "../commands/object/createFolder";
import { downloadObject } from "../commands/object/downloadObject";

const object = program.command("object").description("object operations");

object
  .command("put <visibility> <filePath> <bucketNameAndPath>")
  .description(
    'The "object put" command is used to upload a file from local which is less than 2G.'
  )
  .action(async (visibility, filePath, bucketNameAndPath) => {
    await putObject(bucketNameAndPath, visibility, filePath);
  });

object
  .command("create-folder <bucketNameAndPath>")
  .description("Creates a Folder.")
  .action(async (bucketNameAndPath) => {
    await createFolder(bucketNameAndPath);
  });

object
  .command("get <bucketNameAndPath> <filepath>")
  .description(
    'The "object get" command is used to download an object to local path. This command will return the local file path where the object will be downloaded and the file size after successful execution.'
  )
  .action(async (bucketNameAndPath, filepath) => {
    await downloadObject(bucketNameAndPath, filepath);
  });

export default object;
