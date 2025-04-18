import { useState, useEffect } from "react";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract, toNano } from "ton-core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CHAIN } from "@tonconnect/protocol";
import { GiftCoinBuy } from "../contracts/giftCoinBuy";

export function useGiftCoinBuyContract() {
  const { client, isTonClientReady } = useTonClient(); // Ensure isTonClientReady is used
  const { sender, wallet, network } = useTonConnect();
  const queryClient = useQueryClient();

  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // TODO: Replace with your actual contract address
  const contractAddress = network === CHAIN.MAINNET
    ? "kQDD11wtqE2fr9h6DCfcsAHXszLwnKmOR9JeQEhKtQMAOpjs"
    : "kQDD11wtqE2fr9h6DCfcsAHXszLwnKmOR9JeQEhKtQMAOpjs";

  const giftCoinBuyContract = useAsyncInitialize(async () => {
    if (!client) return null;
    
    try {
      const contract = GiftCoinBuy.fromAddress(Address.parse(contractAddress));
      console.debug('[GiftCoinBuy] Initializing contract:', {
        address: contractAddress,
        network: network
      });
      return client.open(contract) as OpenedContract<GiftCoinBuy>;
    } catch (e) {
      console.error('[GiftCoinBuy] Contract initialization failed:', e);
      return null;
    }
  }, [client, contractAddress]);

  useEffect(() => {
    if (!client || !giftCoinBuyContract) return;
    
    const initializeData = async () => {
      try {
        setIsInitialized(true);
      } catch (e) {
        console.error("Initialization error:", e);
      }
    };

    initializeData();
  }, [client, giftCoinBuyContract]);

  const fetchContractData = async () => {
    if (!giftCoinBuyContract) {
      console.debug('[GiftCoinBuy] Contract not initialized');
      return null;
    }
    try {
      console.group('[GiftCoinBuy] Fetching Data');
      const balance = await giftCoinBuyContract.getTonBalance();
      const rate = await giftCoinBuyContract.getRate();

      if (balance === null || rate === null) {
        throw new Error("Contract returned null values");
      }

      // Multiply rate by 10^9 to convert from nano
      const adjustedRate = (BigInt(rate.toString()) * BigInt(1000000000)).toString();

      const result = { 
        balance: balance.toString(), 
        rate: adjustedRate 
      };
      console.debug('Contract state:', result);
      console.groupEnd();
      return result;
    } catch (e) {
      console.error('[GiftCoinBuy] Data fetch error:', e);
      setError(e as Error);
      console.groupEnd();
      throw e;
    }
  };

  const { data: contractData, isFetching: isContractFetching } = useQuery(
    ["contract"],
    fetchContractData,
    {
      refetchInterval: 5000, // Fetch every 5 seconds
      staleTime: 2000,
      cacheTime: 10000,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
      enabled: isInitialized && !!giftCoinBuyContract,
      onError: (error) => {
        console.error("Query error:", error);
        setError(error as Error);
      },
      onSuccess: (data) => {
        console.log("Contract data fetched successfully:", data);
      },
    }
  );

  const { data: jettonData, isFetching: isJettonFetching } = useQuery(
    ["jettonBalance", wallet?.address],
    async () => {
      if (!giftCoinBuyContract || !wallet) return null;
      try {
        const balance = (await giftCoinBuyContract.getTrackedJettonBalance()).toString();
        console.debug('[GiftCoinBuy] Jetton balance:', balance);
        return { balance };
      } catch (e) {
        console.error('[GiftCoinBuy] Jetton balance error:', e);
        return null;
      }
    },
    {
      refetchInterval: 5000, // Fetch every 5 seconds
      staleTime: 2000,
      cacheTime: 10000,
      retry: 3,
      enabled: isInitialized && !!wallet && !!giftCoinBuyContract,
      onSuccess: (data) => {
        console.log("Jetton balance fetched successfully:", data);
      },
    }
  );

  const { data: jettonWalletData } = useQuery(
    ["contractJettonWallet"],
    async () => {
      if (!giftCoinBuyContract) return null;
      try {
        const address = await giftCoinBuyContract.getContractJettonWalletAddress();
        return address.toString();
      } catch (e) {
        console.error('[GiftCoinBuy] Jetton wallet address error:', e);
        return null;
      }
    },
    {
      enabled: isInitialized && !!giftCoinBuyContract,
    }
  );

  // Add manual update function
  const update = async () => {
    console.debug('[GiftCoinBuy] Updating data...');
    await queryClient.invalidateQueries(["contract"]);
    await queryClient.invalidateQueries(["jettonBalance"]);
  };

  // Buy jettons (send TON to contract)
  const buyJettons = async (tonAmount: string) => {
    if (!giftCoinBuyContract || !sender || !wallet) return;
    await giftCoinBuyContract.send(
      sender.provider,
      sender,
      { value: toNano(tonAmount) },
      null // Sending TON, contract should mint jettons
    );
    update();
  };

  // Withdraw (owner only)
  const withdraw = async (amount: string) => {
    if (!giftCoinBuyContract || !sender) return;
    await giftCoinBuyContract.send(
      sender.provider,
      sender,
      { value: toNano("0.05") },
      { $$type: "Withdraw", amount: toNano(amount) }
    );
    update();
  };

  return {
    address: contractAddress,
    contractBalance: contractData?.balance ?? null,
    rate: contractData?.rate ?? null,
    userJettonBalance: jettonData?.balance ?? null,
    isBalanceLoading: isContractFetching,
    isJettonLoading: isJettonFetching,
    error,
    contractJettonWalletAddress: jettonWalletData ?? null,
    buyJettons,
    withdraw,
    update,
  };
}
