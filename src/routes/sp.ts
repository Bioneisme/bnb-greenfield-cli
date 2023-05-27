import { program } from "commander";
import { getStorageProviders } from "../commands/sp/getStorageProviders";

const sp = program.command("sp").description("storage providers");

sp.command("ls")
  .description("List all storage providers")
  .action(async () => {
    try {
      const providers = await getStorageProviders();
      console.log(providers);
    } catch (e) {
      console.error(e);
    }
  });

export default sp;
