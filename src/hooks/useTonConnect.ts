import { CHAIN } from "@tonconnect/protocol";
import { Address, beginCell, Sender, SenderArguments, Cell, toNano } from "ton-core";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";

export function useTonConnect(): {
  sender: Sender;
  jettonSender: (params: {
    jettonAmount: bigint;
    toAddress: Address;
    jettonWalletAddress: Address;
    value: bigint;
  }) => Promise<void>;
  connected: boolean;
  wallet: string | null;
  network: CHAIN | null;
} {
  const [tonConnectUI] = useTonConnectUI();
  const [network, setNetwork] = useState<CHAIN | null>(null);
  const wallet = tonConnectUI.wallet;

  useEffect(() => {
    console.log("TonConnectUI Wallet:", wallet);
    if (wallet && wallet.account) {
      setNetwork(wallet.account.chain);
    } else {
      setNetwork(null);
    }
  }, [wallet]);

  const sendJetton = async (params: {
    jettonAmount: bigint;
    toAddress: Address;
    jettonWalletAddress: Address;
    value: bigint;
  }) => {
    const jettonAmountAdjusted = params.jettonAmount;

    const transferBody = beginCell()
            .storeUint(0x0f8a7ea5, 32) // transfer op
            .storeUint(Date.now(), 64) // query_id
            .storeCoins(jettonAmountAdjusted) // amount
            .storeAddress(params.toAddress) // destination
            .storeAddress(null) // response_destination
            .storeBit(false) // no custom payload
            .storeCoins(0) // forward_ton_amount
            .storeBit(false) //forward_payload_in_cell
            .endCell()


    await tonConnectUI.sendTransaction({
      messages: [
        {
          address: params.jettonWalletAddress.toString(), // Send to jetton wallet address
          amount: params.value.toString(), // Gas fee
          payload: transferBody.toBoc().toString("base64"),
        },
      ],
      validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
    });
  };

  console.log("Network from useTonConnect:", network);

  return {
    sender: {
      send: async (args: SenderArguments) => {
        await tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000,
        });
      },
    },
    jettonSender: sendJetton,
    connected: !!wallet?.account.address,
    wallet: wallet?.account.address ?? null,
    network: network,
  };
}