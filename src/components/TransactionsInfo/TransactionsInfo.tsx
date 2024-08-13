import {getFixedAmount} from "../../helpers";
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
        <section className={cls["table-row"]} key={tx.hash}>
          <div>
            {tx.senders.map((sender, ind) => (
              <p key={sender + ind}>{sender}</p>
            ))}
          </div>
          <div>
            {tx.recipients.map((recipient, ind) => (
              <p key={recipient + ind}>{recipient}</p>
            ))}
          </div>
          <div>{getFixedAmount(tx.amount)} BTC</div>
        </section>
      ))}
    </div>
  );
};

export default TransactionsInfo;
