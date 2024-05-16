import { BadRequestError } from "../../errors/*/BadRequestError";
import { GetStockError } from "../../errors/stocksError/GetStockError";
import { IStock } from "../../interfaces/IStock";
import database from "../../utils/database";

export class CreateStockService {
  async execute({
    companyName,
    symbol,
    currentPrice,
    description,
  }: Pick<
    IStock,
    "companyName" | "currentPrice" | "description" | "symbol"
  >): Promise<{ id: number }> {
    try {
      const sql =
        "INSERT INTO Stocks (companyName, symbol, currentPrice, description) VALUES (?, ?, ?, ?)";
      const params = [companyName, symbol, currentPrice, description];

      return new Promise((resolve, reject) => {
        database.run(sql, params, function (err) {
          if (err) {
            reject(new GetStockError());
          } else {
            resolve({ id: this.lastID });
          }
        });
      });
    } catch (error) {
      throw new BadRequestError();
    }
  }
}
