export interface ITransaction {
  id: number;
  stocksWalletsId: number;
  type: "BUY" | "SELL";
  quantity: number;
  pricePerStock: number;
  createdAt: Date;
}
