import { ZodError, z } from "zod";
import { BadRequestError } from "../../errors/*/BadRequestError";
import { CreateStockError } from "../../errors/stocksError/CreateStockError";
import { IController, IResponse } from "../../interfaces/IController";
import { IRequest } from "../../interfaces/IRequest";
import { CreateStockService } from "../../services/stocksService/CreateStockService";

const schema = z.object({
  companyName: z.string().min(1),
  currentPrice: z.number(),
  description: z.string().optional(),
  symbol: z.string(),
});

export class CreateStockController implements IController {
  constructor(private readonly createStockService: CreateStockService) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { companyName, currentPrice, description, symbol } =
        schema.parse(body);

      const { id } = await this.createStockService.execute({
        companyName,
        currentPrice,
        description,
        symbol,
      });

      return {
        statusCode: 201,
        body: { message: "Stock has been successfully created with id: " + id },
      };
    } catch (err) {
      if (err instanceof ZodError) {
        return {
          statusCode: 422,
          body: { message: "Invalid data", error: err },
        };
      }

      if (err instanceof CreateStockError) {
        return {
          statusCode: 400,
          body: {
            message: "Something when wrong while creating stock",
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
