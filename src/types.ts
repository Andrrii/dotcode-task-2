interface TransactionOutput {
  value: number;
  addr: string;
}

interface TransactionInput {
  prev_out: TransactionOutput;
}

interface Transaction {
  hash: string;
  out: TransactionOutput[];
  inputs: TransactionInput[];
}

export interface WSMessage {
  op: string;
  x: Transaction;
}

export interface SavedTransactionInfo {
  hash: string;
  amount: number;
  recipients: string[];
  senders: string[];
}
