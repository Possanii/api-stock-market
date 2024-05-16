import { ZodError } from "zod";
import { BadRequestError } from "../../errors/*/BadRequestError";
import { GetStockError } from "../../errors/stocksError/GetStockError";
import { IController, IResponse } from "../../interfaces/IController";
import { GetAllStocksService } from "../../services/stocksService/GetAllStocksService";

export class GetAllStocksController implements IController {
  constructor(private readonly getAllStocksService: GetAllStocksService) {}

  async handle(): Promise<IResponse> {
    try {
      const { stocks } = await this.getAllStocksService.execute();

      return {
        statusCode: 200,
        body: { stocks },
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
            message: "Something when wrong while getting stocks",
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
