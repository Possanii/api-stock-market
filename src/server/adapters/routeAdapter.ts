import { Request, Response } from "express";
import { IController } from "../../app/interfaces/IController";

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {
    const { statusCode, body } = await controller.handle(request);

    response.status(statusCode).json(body);
  };
}
