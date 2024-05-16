import { BadRequestError } from "../../errors/*/BadRequestError";
import { GetStockError } from "../../errors/stocksError/GetStockError";
import { IStock } from "../../interfaces/IStock";
import database from "../../utils/database";

export class GetAllStocksService {
  async execute(): Promise<{ stocks: IStock[] }> {
    try {
      const sql = "SELECT * FROM Stocks";

      return new Promise((resolve, reject) => {
        database.all(sql, (err, rows) => {
          if (err || !rows) {
            console.log(err);

            reject(new GetStockError());
          } else {
            const stocks: IStock[] = rows.map((row) => row as IStock);
            resolve({ stocks });
          }
        });
      });
    } catch (err) {
      throw new BadRequestError();
    }
  }
}
