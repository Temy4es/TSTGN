import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "ton";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import { useState, useEffect } from "react";

export function useTonClient() {
  const { network } = useTonConnect();
  const [isTonClientReady, setIsTonClientReady] = useState(false);

  const client = useAsyncInitialize(async () => {
    // Use testnet as default if network is not available
    const currentNetwork = network || CHAIN.TESTNET;

    console.log("Initializing TonClient for network:", currentNetwork);
    const endpoint = await getHttpEndpoint({
      network: currentNetwork === CHAIN.MAINNET ? "mainnet" : "testnet",
    });

    console.log("TonClient endpoint:", endpoint);
    const newClient = new TonClient({ endpoint });
    setIsTonClientReady(true);
    return newClient;
  }, [network]);

  useEffect(() => {
    if (!client && network) {
      setIsTonClientReady(false);
    }
  }, [client, network]);

  console.log("TonClient:", client);

  return { client, isTonClientReady };
}
