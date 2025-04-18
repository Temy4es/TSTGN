import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { BuyJettons } from './components/BuyJettons';
import { GiftCoinBuyBalance } from './components/GiftCoinBuyBalance';
import { Withdraw } from './components/Withdraw';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Ton Mini App</h1>
      <TonConnectButton /> {/* Add TonConnectButton here */}
      <GiftCoinBuyBalance />
      <BuyJettons />
      <Withdraw />
    </div>
  );
}

export default App;
