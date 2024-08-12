import {SavedTransactionInfo} from "./types";

interface TransactionsInfoProps {
  transactions: SavedTransactionInfo[];
}

const TransactionsInfo = ({transactions}: TransactionsInfoProps) => {
  return (
    <ul>
      {transactions.map((tx, index) => (
        <li key={index}>
          Hash: {tx.hash}, Amount: {tx.amount.toFixed(8)} BTC
        </li>
      ))}
    </ul>
  );
};

export default TransactionsInfo;
