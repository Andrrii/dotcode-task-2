import {useState} from "react";
import useWS from "./useWS";
import {WSMessage, SavedTransactionInfo} from "./types";
import TransactionsInfo from "./TransactionsInfo";

function App() {
  const [transactions, setTransactions] = useState<SavedTransactionInfo[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const {isConnected, disconnectWebSocket, establishWebSocketConnection} =
    useWS();

  const handleMessage = (message: WSMessage) => {
    if (message.op === "utx") {
      const amount =
        message.x.out.reduce((sum, output) => sum + output.value, 0) / 1e8; // Satoshi to BTC
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        {
          hash: message.x.hash,
          amount,
        },
      ]);
      setTotalAmount((prevTotal) => prevTotal + amount);
    }
  };

  const resetTransactions = () => {
    setTransactions([]);
    setTotalAmount(0);
  };

  return (
    <div>
      <h1>Bitcoin Transactions</h1>
      <div>
        <button
          onClick={() => establishWebSocketConnection(handleMessage)}
          disabled={isConnected}
        >
          Запуск
        </button>
        <button onClick={disconnectWebSocket} disabled={!isConnected}>
          Зупинка
        </button>
        <button onClick={resetTransactions}>Скинути</button>
      </div>
      <h2>Загальна сума: {totalAmount.toFixed(8)} BTC</h2>
      <TransactionsInfo transactions={transactions} />
    </div>
  );
}

export default App;
