import { DEFAULT_ENTRYPOINT_ADDRESS, BiconomySmartAccountV2 } from "@biconomy/account";
import { IBundler, Bundler } from "@biconomy/bundler";
import { ChainId } from "@biconomy/core-types";
import { BiconomyPaymaster, IPaymaster } from "@biconomy/paymaster";
require("dotenv").config();

export const bundler: IBundler = new Bundler({
    bundlerUrl:
      "https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
    chainId: ChainId.POLYGON_MUMBAI,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  });

export const paymaster: IPaymaster = new BiconomyPaymaster({
    paymasterUrl: process.env.PAYMASTER_API || "",
});
