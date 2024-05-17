import { BadRequestError } from "../../errors/*/BadRequestError";
import { CreateTransactionError } from "../../errors/transactionError/CreateTransactionError";
import { ITransaction } from "../../interfaces/ITransaction";
import database from "../../utils/database";

export class CreateTransactionService {
  async execute({
    stocksWalletsId,
    type,
    quantity,
    pricePerStock,
  }: Pick<
    ITransaction,
    "stocksWalletsId" | "type" | "quantity" | "pricePerStock"
  >): Promise<{ id: number }> {
    try {
      const sql =
        "INSERT INTO Transactions (stocksWalletsId, type, quantity, pricePerStock) VALUES (?, ?, ?, ?)";
      const params = [stocksWalletsId, type, quantity, pricePerStock];
      return new Promise((resolve, reject) => {
        database.run(sql, params, function (err) {
          if (err) {
            reject(new CreateTransactionError(err.message));
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
