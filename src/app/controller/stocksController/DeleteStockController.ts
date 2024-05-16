import { ZodError, z } from "zod";
import { BadRequestError } from "../../errors/*/BadRequestError";
import { DeleteStockError } from "../../errors/stocksError/DeleteStockError";
import { IController, IResponse } from "../../interfaces/IController";
import { IRequest } from "../../interfaces/IRequest";
import { DeleteStockService } from "../../services/stocksService/DeleteStockService";

const schame = z.object({
  id: z.union([
    z
      .string()
      .min(1)
      .transform((value) => Number(value)),
    z.number().min(1),
  ]),
});

export class DeleteStockController implements IController {
  constructor(private readonly deleteStockService: DeleteStockService) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    try {
      const { id } = schame.parse(params);

      const isDeleted = await this.deleteStockService.execute({ id });

      if (!isDeleted) {
        throw new DeleteStockError();
      }

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

      if (err instanceof DeleteStockError) {
        return {
          statusCode: 400,
          body: {
            message: "Something when wrong while deleting stocks",
            error: err,
          },
        };
      }

      if (err instanceof BadRequestError) {
        return {
          statusCode: 400,
          body: { message: "Bad request", error: err },
        };
      }

      return {
        statusCode: 500,
        body: { message: "Internal Error", error: err },
      };
    }
  }
}
