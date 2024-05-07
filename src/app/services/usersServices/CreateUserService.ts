import { CreateUserError } from "../../errors/usersErrors/CreateUserError";
import { IUser } from "../../interfaces/IUser";
import database from "../../utils/database";

export class CreateUserService {
  async execute({
    username,
    password,
    email,
  }: Partial<IUser>): Promise<{ id: number }> {
    try {
      const sql =
        "INSERT INTO Users (username, password, email) VALUES (?, ?, ?)";
      const params = [username, password, email];

      return new Promise((resolve, reject) => {
        database.run(sql, params, function (err) {
          if (err) {
            reject(new CreateUserError());
          } else {
            resolve({ id: this.lastID });
          }
        });
      });
    } catch (err) {
      throw CreateUserError;
    }
  }
}
