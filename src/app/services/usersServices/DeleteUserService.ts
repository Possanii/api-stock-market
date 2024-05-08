import { UserNotFound } from "../../errors/usersErrors/UserNotFound";
import database from "../../utils/database";

export class DeleteUserService {
  async execute({ id }: { id: number }): Promise<boolean> {
    const sql = "DELETE FROM Users WHERE id = ?";
    const params = [id];

    return new Promise((resolve, reject) => {
      database.run(sql, params, function (err) {
        if (err || this.changes === 0) {
          reject(new UserNotFound());
        } else {
          resolve(this.changes !== 0);
        }
      });
    });
  }
}
