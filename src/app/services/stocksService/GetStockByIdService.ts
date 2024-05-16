import { BadRequestError } from "../../errors/*/BadRequestError";
import { GetStockError } from "../../errors/stocksError/GetStockError";
import { IStock } from "../../interfaces/IStock";
import database from "../../utils/database";

export class GetStockByIdService {
  async execute({ id }: { id: number }): Promise<{ stock: IStock }> {
    try {
      const sql = "SELECT * FROM Stocks WHERE id = ?";
      const params = [id];

      return new Promise((resolve, reject) => {
        database.get(sql, params, (err, row) => {
          if (err || !row) {
            reject(new GetStockError());
          } else {
            resolve({ stock: row as IStock });
          }
        });
      });
    } catch (err) {
      throw new BadRequestError();
    }
  }
}
