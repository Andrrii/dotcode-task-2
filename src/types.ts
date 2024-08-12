interface TransactionOutput {
  value: number;
  addr: string;
}

interface Transaction {
  hash: string;
  out: TransactionOutput[];
}

export interface WSMessage {
  op: string;
  x: Transaction;
}

export interface SavedTransactionInfo {
  hash: string;
  amount: number;
}
