import { BadRequestError } from "../../errors/*/BadRequestError";
import { DeleteStockError } from "../../errors/stocksError/DeleteStockError";
import database from "../../utils/database";

export class DeleteStockService {
  async execute({ id }: { id: number }): Promise<boolean> {
    try {
      const sql = "DELETE FROM Stocks WHERE id = ?";
      const params = [id];

      return new Promise((resolve, reject) => {
        database.run(sql, params, function (error) {
          if (error) {
            reject(new DeleteStockError(error.message));
          } else {
            resolve(this.changes !== 0);
          }
        });
      });
    } catch (error) {
      throw new BadRequestError();
    }
  }
}
