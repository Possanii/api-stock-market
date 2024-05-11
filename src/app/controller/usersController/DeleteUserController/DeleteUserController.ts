import z, { ZodError } from "zod";
import { UserNotFound } from "../../../errors/usersErrors/UserNotFound";
import { IController, IResponse } from "../../../interfaces/IController";
import { IRequest } from "../../../interfaces/IRequest";
import { DeleteUserService } from "../../../services/usersServices/DeleteUserService";

const deleteUserSchema = z.object({
  id: z.union([
    z
      .string()
      .min(1)
      .transform((value) => Number(value)),
    z.number().min(1),
  ]),
});

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    try {
      const { id } = deleteUserSchema.parse(params);

      await this.deleteUserService.execute({ id });

      return {
        statusCode: 200,
        body: { message: "The user " + id + " has been successfully deleted" },
      };
    } catch (err) {
      if (err instanceof ZodError) {
        return {
          statusCode: 422,
          body: { message: "Invalid data", error: err },
        };
      }

      if (err instanceof UserNotFound) {
        return {
          statusCode: 404,
          body: {
            message: "Something went wrong while deleting user",
            error: err,
          },
        };
      }

      return {
        statusCode: 500,
        body: { message: "Internal Error", error: err },
      };
    }
  }
}
