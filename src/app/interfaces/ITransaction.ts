export interface ITransaction {
  id: number;
  userId: number;
  stockId: number;
  type: string;
  quantity: number;
  pricePerStock: number;
  timestamp: Date;
}
