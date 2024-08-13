import {useState} from "react";
import useTransactionsData from "../../hooks/useTransactionsData";
import {WSMessage, SavedTransactionInfo} from "../../types";
import AppButton from "../AppButton/AppButton";
import TransactionsInfo from "../TransactionsInfo/TransactionsInfo";
import cls from "./TransactionsMonitor.module.css";
import {getFixedAmount} from "../../helpers";

const UNCONFIRMED_TRANSACTIONS = "utx";

function TransactionsMonitor() {
  const [transactions, setTransactions] = useState<SavedTransactionInfo[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const {isConnected, disconnectWebSocket, establishWebSocketConnection} =
    useTransactionsData();

  const handleMessage = (message: WSMessage) => {
    if (message.op === UNCONFIRMED_TRANSACTIONS) {
      const amount =
        message.x.out.reduce((sum, output) => sum + output.value, 0) / 1e8; // Satoshi to BTC

      const recipients = message.x.out.map((output) => output.addr);
      const senders = message.x.inputs.map((input) => input.prev_out.addr);

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        {
          hash: message.x.hash,
          amount,
          recipients,
          senders,
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
    <main className={cls["transactions-monitor"]}>
      <h1>Bitcoin Transactions</h1>
      <div className={cls["control-buttons"]}>
        <AppButton
          onClick={() => establishWebSocketConnection(handleMessage)}
          disabled={isConnected}
          variant="success"
        >
          Start
        </AppButton>
        <AppButton
          onClick={disconnectWebSocket}
          disabled={!isConnected}
          variant="warning"
        >
          Pause
        </AppButton>
        <AppButton onClick={resetTransactions} variant="danger">
          Reset
        </AppButton>
      </div>
      <h2>Total amount: {getFixedAmount(totalAmount)} BTC</h2>
      <TransactionsInfo transactions={transactions} />
    </main>
  );
}

export default TransactionsMonitor;
