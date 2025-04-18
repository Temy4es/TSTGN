import { useState } from "react";
import styled from "styled-components";
import { Address, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { useFaucetJettonContract } from "../hooks/useFaucetJettonContract";
import { Card, FlexBoxCol, FlexBoxRow, Button, Input } from "./styled/styled";

export function TransferTon() {
  const { jettonSender, connected } = useTonConnect();
  const { jettonWalletAddress, balance } = useFaucetJettonContract();

  const [jettonAmount, setJettonAmount] = useState("1");
  const [recipientAddress, setRecipientAddress] = useState(
    "0QBTFls_xF6p39HQN110H9_kfbcgu4O41LiIqLxTm5SS4VB1" // Replace with a valid address
  );

  return (
    <Card>
      <FlexBoxCol>
        <h3>Перевод Jetton</h3>

        <FlexBoxCol style={{ marginBottom: 20 }}>
          <FlexBoxRow>
            <strong>Ваш Jetton кошелек:</strong>
            <span>{jettonWalletAddress}</span>
          </FlexBoxRow>
          <FlexBoxRow>
            <strong>Ваш баланс:</strong>
            <span>{balance ?? 'Загрузка...'} JET</span>
          </FlexBoxRow>
        </FlexBoxCol>

        <FlexBoxRow>
          <label>Количество Jetton </label>
          <Input
            style={{ marginRight: 8 }}
            type="number"
            value={jettonAmount}
            onChange={(e) => setJettonAmount(e.target.value)}
          />
        </FlexBoxRow>

        <FlexBoxRow>
          <label>Адрес получателя </label>
          <Input
            style={{ marginRight: 8 }}
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </FlexBoxRow>

        <Button
          disabled={!connected || !jettonWalletAddress}
          style={{ marginTop: 18 }}
          onClick={async () => {
            if (!jettonSender || !jettonWalletAddress) return;

            try {
              await jettonSender({
                jettonAmount: toNano(jettonAmount), // Amount to transfer (in nanotons)
                toAddress: Address.parse(recipientAddress), // Destination address
                jettonWalletAddress: Address.parse(jettonWalletAddress), //Sender's Jetton wallet address
                value: toNano("0.05"), // Gas fee (in nanotons)
              });
            } catch (e) {
              console.error("Transfer error:", e);
            }
          }}
        >
          Перевести Jetton
        </Button>
      </FlexBoxCol>
    </Card>
  );
}