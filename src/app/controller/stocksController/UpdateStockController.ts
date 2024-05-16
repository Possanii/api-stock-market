import { ZodError, z } from "zod";
import { BadRequestError } from "../../errors/*/BadRequestError";
import { UpdateStockError } from "../../errors/stocksError/UpdateStockError";
import { IController, IResponse } from "../../interfaces/IController";
import { IRequest } from "../../interfaces/IRequest";
import { UpdateStockService } from "../../services/stocksService/UpdateStockService";

const schema = z
  .object({
    id: z.number().min(1),
    currentPrice: z.number().optional(),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.currentPrice && !data.description) {
        return false;
      }
      return true;
    },
    { message: "Nothing to update" },
  );

export class UpdateStockController implements IController {
  constructor(private readonly updateStockService: UpdateStockService) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { id, currentPrice, description } = schema.parse(body);

      const isUpdated = await this.updateStockService.execute({
        id,
        currentPrice,
        description,
      });

      if (!isUpdated) {
        throw new UpdateStockError();
      }

      return {
        statusCode: 200,
        body: {
          message: "Stock with id " + id + " has been successfully updated",
        },
      };
    } catch (err) {
      if (err instanceof ZodError) {
        return {
          statusCode: 422,
          body: { message: "Invalid data", error: err },
        };
      }

      if (err instanceof UpdateStockError) {
        return {
          statusCode: 400,
          body: {
            message: "Something when wrong while updating stock",
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
