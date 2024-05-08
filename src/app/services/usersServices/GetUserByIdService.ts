import { UserNotFound } from "../../errors/usersErrors/UserNotFound";
import { IUser } from "../../interfaces/IUser";
import database from "../../utils/database";

export class GetUserByIdService {
  async execute({ id }: { id: number }): Promise<IUser> {
    const sql = "SELECT * FROM Users WHERE id = ?";
    const params = [id];
    return new Promise((resolve, reject) => {
      database.get(sql, params, (err, row) => {
        if (err || !row) {
          reject(new UserNotFound());
        } else {
          resolve(row as IUser);
        }
      });
    });
  }
}
