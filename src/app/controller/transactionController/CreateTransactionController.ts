import { ZodError, z } from "zod";
import { BadRequestError } from "../../errors/*/BadRequestError";
import { CreateTransactionError } from "../../errors/transactionError/CreateTransactionError";
import { IController, IResponse } from "../../interfaces/IController";
import { IRequest } from "../../interfaces/IRequest";
import { CreateStockWalletService } from "../../services/StocksWalletsService/CreateStockWalletService";
import { GetStockByIdService } from "../../services/stocksService/GetStockByIdService";
import { CreateTransactionService } from "../../services/transactionService/CreateTransactionService";

const schema = z.object({
  walletId: z.union([
    z
      .string()
      .min(1)
      .transform((value) => Number(value)),
    z.number().min(1),
  ]),
  stockId: z.union([
    z
      .string()
      .min(1)
      .transform((value) => Number(value)),
    z.number().min(1),
  ]),
  type: z.enum(["BUY", "SELL"]),
  quantity: z.union([
    z
      .string()
      .min(1)
      .transform((value) => Number(value)),
    z.number().min(1),
  ]),
});

export class CreateTransactionController implements IController {
  constructor(
    private readonly createStockWalletService: CreateStockWalletService,
    private readonly getStockByIdService: GetStockByIdService,
    private readonly createTransactionService: CreateTransactionService,
  ) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { walletId, stockId, type, quantity } = schema.parse(body);

      const { id: stocksWalletsId } =
        await this.createStockWalletService.execute({
          walletId,
          stockId,
          quantity,
        });

      const { stock } = await this.getStockByIdService.execute({ id: stockId });

      const { id } = await this.createTransactionService.execute({
        stocksWalletsId,
        type,
        quantity,
        pricePerStock: stock.currentPrice,
      });

      return {
        statusCode: 200,
        body: {
          message: "Transaction has been successfully created with id: " + id,
        },
      };
    } catch (err) {
      if (err instanceof ZodError) {
        return {
          statusCode: 422,
          body: { message: "Invalid data", error: err },
        };
      }

      if (err instanceof CreateTransactionError) {
        return {
          statusCode: 400,
          body: {
            message: "Something when wrong while creating wallet",
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
