import { UserNotFound } from "../../errors/usersErrors/UserNotFound";
import { IUser } from "../../interfaces/IUser";
import database from "../../utils/database";

export class updateUserService {
  async execute({
    username,
    password,
    email,
    id,
  }: Partial<IUser>): Promise<void> {
    const sql =
      "UPDATE Users SET username = ?, password = ?, email = ? WHERE id = ?";
    const params = [username, password, email, id];

    return new Promise((resolve, reject) => {
      database.run(sql, params, function (err) {
        if (err || this.changes === 0) {
          reject(new UserNotFound());
        } else {
          resolve();
        }
      });
    });
  }
}
