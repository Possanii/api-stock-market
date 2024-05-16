import { ZodError, z } from "zod";
import { BadRequestError } from "../../errors/*/BadRequestError";
import { CreateWalletError } from "../../errors/walletError/CreateWalletError";
import { IController, IResponse } from "../../interfaces/IController";
import { IRequest } from "../../interfaces/IRequest";
import { CreateWalletService } from "../../services/walletService/CreateWalletService";

const schame = z.object({
  userId: z.union([
    z
      .string()
      .min(1)
      .transform((value) => Number(value)),
    z.number().min(1),
  ]),
  balance: z.union([
    z
      .string()
      .min(1)
      .transform((value) => Number(value)),
    z.number().min(1),
  ]),
});

export class CreateWalletController implements IController {
  constructor(private readonly createWalletService: CreateWalletService) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { userId, balance } = schame.parse(body);

      const { id } = await this.createWalletService.execute({
        userId,
        balance,
      });

      return {
        statusCode: 201,
        body: {
          message: "Wallet has been successfully created with id: " + id,
        },
      };
    } catch (err) {
      if (err instanceof ZodError) {
        return {
          statusCode: 422,
          body: { message: "Invalid data", error: err },
        };
      }

      if (err instanceof CreateWalletError) {
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
