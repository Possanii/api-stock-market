import { BadRequestError } from "../../errors/*/BadRequestError";
import { CreateWalletError } from "../../errors/walletError/CreateWalletError";
import { IWallet } from "../../interfaces/IWallet";
import database from "../../utils/database";

export class CreateWalletService {
  async execute({
    userId,
    stockId,
    quantity,
  }: Partial<IWallet>): Promise<{ id: number }> {
    try {
      const sql =
        "INSERT INTO Wallet (userId, stockId, quantity) VALUES(?, ?, ?)";
      const params = [userId, stockId, quantity];

      return new Promise((resolve, reject) => {
        database.run(sql, params, function (error) {
          if (error) {
            reject(new CreateWalletError());
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
