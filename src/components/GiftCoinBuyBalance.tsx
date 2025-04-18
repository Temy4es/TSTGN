import { fromNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { useGiftCoinBuyContract } from "../hooks/useGiftCoinBuyContract";
import { Card, FlexBoxCol, FlexBoxRow } from "./styled/styled";
import styled from "styled-components";

const AddressLink = styled.a`
  color: #0088CC;
  text-decoration: none;
  word-break: break-all;
  
  &:hover {
    text-decoration: underline;
  }
`;

export function GiftCoinBuyBalance() {
  const { connected, network } = useTonConnect();
  const { 
    contractBalance, 
    userJettonBalance, 
    address,
    isBalanceLoading,
    isJettonLoading,
    rate,
    error,
    contractJettonWalletAddress
  } = useGiftCoinBuyContract();

  const getExplorerUrl = (addr: string) => 
    `https://${network === 'mainnet' ? '' : 'testnet.'}tonviewer.com/${addr}`;

  return (
    <Card>
      <FlexBoxCol>
        <h3>Баланс Gift Coin</h3>

        <FlexBoxRow>
          <b>Адрес контракта: </b>
          <AddressLink href={getExplorerUrl(address)} target="_blank" rel="noopener noreferrer">
            {address}
          </AddressLink>
        </FlexBoxRow>
        <FlexBoxRow>
          <b>Адрес Jetton-кошелька контракта: </b>
          <AddressLink href={getExplorerUrl(contractJettonWalletAddress)} target="_blank" rel="noopener noreferrer">
            {contractJettonWalletAddress}
          </AddressLink>
        </FlexBoxRow>
        <FlexBoxRow>
          <b>Баланс контракта в TON: </b>
          <div>
            {error 
              ? `Ошибка загрузки: ${error.message}` 
              : contractBalance 
                ? `${Number(fromNano(contractBalance)).toLocaleString()} TON` 
                : "0 TON"}
          </div>
        </FlexBoxRow>
        {connected && (
          <>
            <FlexBoxRow>
              <b>Баланс контракта GiftCoin: </b>
              <div>
                {userJettonBalance 
                  ? `${fromNano(userJettonBalance)} GIFT` 
                  : "0 GIFT"}
              </div>
            </FlexBoxRow>
            <FlexBoxRow>
              <b>Курс обмена: </b>
              <div>{rate ? `1 TON = ${fromNano(rate)} GIFT` : "0 GIFT"}</div>
            </FlexBoxRow>
          </>
        )}
      </FlexBoxCol>
    </Card>
  );
}