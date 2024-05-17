export interface ITransaction {
  id: number;
  walletId: number;
  stockId: number;
  type: "BUY" | "SELL";
  quantity: number;
  pricePerStock: number;
  createdAt: Date;
}
