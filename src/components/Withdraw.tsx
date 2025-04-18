import { useState } from 'react';
import { useTonConnect } from '../hooks/useTonConnect';
import { useGiftCoinBuyContract } from '../hooks/useGiftCoinBuyContract';
import { Card, FlexBoxCol, FlexBoxRow, Button, Input } from './styled/styled';

export function Withdraw() {
  const { connected } = useTonConnect();
  const { isOwner, withdraw, contractBalance } = useGiftCoinBuyContract();
  const [amount, setAmount] = useState('');

  const onWithdraw = () => {
    if (!amount) return;
    withdraw(amount);
    setAmount('');
  };

  if (!connected || !isOwner) return null;

  return (
    <Card>
      <FlexBoxCol>
        <h3>Вывод TON (Только для владельца)</h3>
        <FlexBoxRow>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Введите количество TON для вывода"
          />
        </FlexBoxRow>
        <Button onClick={onWithdraw}>Вывести</Button>
      </FlexBoxCol>
    </Card>
  );
}
