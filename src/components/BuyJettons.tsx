import { useState, useEffect } from 'react';
import { fromNano, toNano } from 'ton';
import { useTonConnect } from '../hooks/useTonConnect';
import { useGiftCoinBuyContract } from '../hooks/useGiftCoinBuyContract';
import { Card, FlexBoxCol, FlexBoxRow, Button, Input } from './styled/styled';

export function BuyJettons() {
  const { connected } = useTonConnect();
  const { rate, buyJettons } = useGiftCoinBuyContract();
  const [tonAmount, setTonAmount] = useState('');
  const [estimatedJettons, setEstimatedJettons] = useState('0');

  useEffect(() => {
    if (rate && tonAmount) {
      const jettons = (Number(tonAmount) * Number(fromNano(rate))).toString();
      setEstimatedJettons(jettons);
    } else {
      setEstimatedJettons('0');
    }
  }, [tonAmount, rate]);

  const onBuy = () => {
    if (!tonAmount) return;
    buyJettons(tonAmount);
    setTonAmount('');
  };

  if (!connected) return null;

  return (
    <Card>
      <FlexBoxCol>
        <h3>Купить Gift Coins</h3>
        <FlexBoxRow>
          <Input
            type="number"
            value={tonAmount}
            onChange={(e) => setTonAmount(e.target.value)}
            placeholder="Введите количество TON"
          />
        </FlexBoxRow>
        <FlexBoxRow>
          <span>Вы получите: {estimatedJettons} GIFT</span>
        </FlexBoxRow>
        <Button onClick={onBuy}>Купить Jetton</Button>
      </FlexBoxCol>
    </Card>
  );
}
