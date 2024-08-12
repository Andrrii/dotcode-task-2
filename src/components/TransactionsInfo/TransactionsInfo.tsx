import {SavedTransactionInfo} from "../../types";
import cls from "./TransactionsInfo.module.css";

interface TransactionsInfoProps {
  transactions: SavedTransactionInfo[];
}

const TransactionsInfo = ({transactions}: TransactionsInfoProps) => {
  return (
    <div className={cls["transactions-info"]}>
      <section className={cls["table-header"]}>
        <div>From</div>
        <div>To</div>
        <div>Sum</div>
      </section>
      {transactions.map((tx) => (
        <section className={cls["table__row"]} key={tx.hash}>
          <div>
            {tx.senders.map((sender, index) => (
              <p key={sender + index}>{sender}</p>
            ))}
          </div>
          <div>
            {tx.recipients.map((recipient, index) => (
              <p key={recipient + index}>{recipient}</p>
            ))}
          </div>
          <div>{tx.amount.toFixed(8)} BTC</div>
        </section>
      ))}
    </div>
  );
};

export default TransactionsInfo;
