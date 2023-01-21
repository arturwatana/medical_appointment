import { CreateUserUseCase } from "./create-user.usecase";
import { Request, Response } from "express";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const data = req.body;
      const useCase = new CreateUserUseCase();
      const result = await useCase.execute(data);

      return res.json(result);
    } catch (err: any) {
      res.status(400).json(err.message);
    }
  }
}
