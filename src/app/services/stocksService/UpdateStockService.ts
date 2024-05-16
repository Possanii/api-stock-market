import { BadRequestError } from "../../errors/*/BadRequestError";
import { UpdateStockError } from "../../errors/stocksError/UpdateStockError";
import { IStock } from "../../interfaces/IStock";
import database from "../../utils/database";

export class UpdateStockService {
  async execute({
    id,
    currentPrice,
    description,
  }: Partial<IStock>): Promise<boolean> {
    try {
      // Initialize arrays for storing update clauses and their corresponding parameters
      const updates = [];
      const params: unknown[] = [];

      // Conditionally add update clauses and parameters based on defined values
      if (currentPrice !== undefined) {
        updates.push("currentPrice = ?");
        params.push(currentPrice);
      }

      if (description !== undefined) {
        updates.push("description = ?");
        params.push(description);
      }

      if (updates.length === 0) {
        return false;
      }

      params.push(id);

      // Construct the final SQL query by joining update clauses
      const sql = `UPDATE Stocks SET ${updates.join(", ")} WHERE id = ?`;

      return new Promise((resolve, reject) => {
        database.run(sql, params, function (err) {
          if (err) {
            reject(new UpdateStockError());
          } else {
            resolve(this.changes !== 0);
          }
        });
      });
    } catch (err) {
      throw new BadRequestError();
    }
  }
}
