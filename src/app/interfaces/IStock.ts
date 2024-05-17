export interface IStock {
  id: number;
  companyName: string;
  symbol: string;
  currentPrice: number;
  createdAt: Date;
  description?: string;
}
