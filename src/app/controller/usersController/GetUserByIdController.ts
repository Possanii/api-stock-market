import z, { ZodError } from "zod";
import { UserNotFound } from "../../errors/usersErrors/UserNotFound";
import { IController, IResponse } from "../../interfaces/IController";
import { IRequest } from "../../interfaces/IRequest";
import { GetUserByIdService } from "../../services/usersServices/GetUserByIdService";

const getUserByIdSchema = z.object({
  id: z.union([
    z
      .string()
      .min(1)
      .transform((value) => Number(value)),
    z.number().min(1),
  ]),
});

export class GetUserByIdController implements IController {
  constructor(private readonly getUserByIdService: GetUserByIdService) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    try {
      const { id } = getUserByIdSchema.parse(params);

      const user = await this.getUserByIdService.execute({ id });

      if (!user) {
        throw new UserNotFound();
      }

      return {
        statusCode: 200,
        body: { user },
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
          statusCode: 400,
          body: {
            message: "Something went wrong while getting user",
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
