import { WalletNotFoundError } from "../../errors/walletError/WalletNotFound";
import { IWallet } from "../../interfaces/IWallet";
import database from "../../utils/database";

export class GetWalletByIdService {
  async execute({ id }: { id: number }): Promise<{ wallet: IWallet }> {
    const sql = "SELECT * FROM Wallet WHERE id = ?";
    const params = [id];
    return new Promise((resolve, reject) => {
      database.get(sql, params, (err, row) => {
        if (err || !row) {
          reject(new WalletNotFoundError());
        } else {
          resolve({ wallet: row as IWallet });
        }
      });
    });
  }
}
