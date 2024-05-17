import { GetStockByIdService } from "../stocksService/GetStockByIdService";
import { GetWalletByIdService } from "../walletService/GetWalletByIdService";

interface IValidateTransactionIsValid {
  stockId: number;
  walletId: number;
  quantity: number;
}

export class ValidateTransactionIsValid {
  constructor(
    private readonly getStockByIdService: GetStockByIdService,
    private readonly getWalletByIdService: GetWalletByIdService,
  ) {}

  async execute({
    stockId,
    walletId,
    quantity,
  }: IValidateTransactionIsValid): Promise<{ isValid: boolean }> {
    try {
      const [{ stock }, { wallet }] = await Promise.all([
        this.getStockByIdService.execute({ id: stockId }),
        this.getWalletByIdService.execute({ id: walletId }),
      ]);

      const totalPrice = stock.currentPrice * quantity;

      if (totalPrice > wallet.balance) return { isValid: false };

      return { isValid: true };
    } catch (err) {
      return { isValid: false };
    }
  }
}
