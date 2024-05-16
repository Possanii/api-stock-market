import { ZodError, z } from "zod";
import { BadRequestError } from "../../errors/*/BadRequestError";
import { GetStockError } from "../../errors/stocksError/GetStockError";
import { IController, IResponse } from "../../interfaces/IController";
import { IRequest } from "../../interfaces/IRequest";
import { GetStockByIdService } from "../../services/stocksService/GetStockByIdService";

const schema = z.object({
  id: z.union([
    z
      .string()
      .min(1)
      .transform((value) => Number(value)),
    z.number().min(1),
  ]),
});

export class GetStockByIdController implements IController {
  constructor(private readonly getStockByIdService: GetStockByIdService) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    try {
      const { id } = schema.parse(params);

      const { stock } = await this.getStockByIdService.execute({ id });

      return {
        statusCode: 200,
        body: { stock },
      };
    } catch (err) {
      if (err instanceof ZodError) {
        return {
          statusCode: 422,
          body: { message: "Invalid data", error: err },
        };
      }

      if (err instanceof GetStockError) {
        return {
          statusCode: 400,
          body: {
            message: "Something when wrong while getting stock by id",
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
