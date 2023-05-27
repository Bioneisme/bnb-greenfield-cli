import { program } from "commander";
import { getStorageProviders } from "../commands/sp/getStorageProviders";
import { getSecondarySpStorePrice } from "../commands/sp/getSecondarySpStorePrice";
import { getStorageProviderInfo } from "../commands/sp/getStorageProviderInfo";
import { getStoragePriceByTime } from "../commands/sp/getStoragePriceByTime";

const sp = program.command("sp").description("storage providers");

sp.command("ls")
  .description("list all storage providers")
  .action(async () => {
    await getStorageProviders();
  });

sp.command("secondary")
  .description("secondary storage price, including update time and store price")
  .action(async () => {
    await getSecondarySpStorePrice();
  });

sp.command("info <address>")
  .description("info with the sp chain address")
  .action(async (address) => {
    await getStorageProviderInfo(address);
  });

sp.command("price <address>")
  .description("price with the sp chain address")
  .action(async (address) => {
    await getStoragePriceByTime(address);
  });
export default sp;
