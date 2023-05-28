import { putObject } from "../commands/bucket/putObject";
import bucket from "./bucket";
import { program } from "commander";
import { createFolder } from "../commands/bucket/createFolder";
import { downloadObject } from "../commands/bucket/downloadObject";

const object = program.command("object").description("object");

object
  .command(
    "put --content-type 'text/xml' --visibility=<visibility> <filePath> <bucketNameAndPath>"
  )
  .description(
    'The "object put" command is used to upload a file from local which is less than 2G.'
  )
  .action(async (visibility, filePath, bucketNameAndPath) => {
    await putObject(bucketNameAndPath, visibility, filePath);
  });

object
  .command("put create-folder 'text/xml' <bucketNameAndPath>")
  .description(
    'The "object put" command is used to upload a file from local which is less than 2G.'
  )
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
