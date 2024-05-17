import { BadRequestError } from "../../errors/*/BadRequestError";
import { InvalidOperationError } from "../../errors/*/InvalidOperationError";
import { CreateStocksWalletError } from "../../errors/StocksWalletError/CreateStocksWalletError";
import { IStocksWallets } from "../../interfaces/IStocksWallets";
import database from "../../utils/database";
import { ValidateTransactionIsValid } from "../transactionService/ValidateTransactionIsValid";

export class CreateStockWalletService {
  constructor(
    private readonly validateTransactionIsValid: ValidateTransactionIsValid,
  ) {}

  async execute({
    walletId,
    stockId,
    quantity,
  }: Pick<IStocksWallets, "walletId" | "stockId" | "quantity">): Promise<{
    id: number;
  }> {
    try {
      const { isValid } = await this.validateTransactionIsValid.execute({
        stockId,
        walletId,
        quantity,
      });

      if (!isValid) {
        throw new InvalidOperationError();
      }

      const sql =
        "INSERT INTO StocksWallets (walletId, stockId, quantity) VALUES (?, ?, ?)";
      const params = [walletId, stockId, quantity];

      return new Promise((resolve, reject) => {
        database.run(sql, params, function (err) {
          if (err) {
            reject(new CreateStocksWalletError());
          } else {
            resolve({ id: this.lastID });
          }
        });
      });
    } catch (err) {
      throw new BadRequestError();
    }
  }
}
