import { CreateUserUseCase } from "./create-user.usecase";
import { Request, Response } from "express";
import { logger } from "../../../../utils/logger";
import { IUserRepository } from "../../repositories/user.repository";

export class CreateUserController {
  constructor(private userRepository: IUserRepository) {}
  async handle(req: Request, res: Response) {
    logger.info("Usuario sendo criado");
    try {
      const data = req.body;
      const useCase = new CreateUserUseCase(this.userRepository);
      const result = await useCase.execute(data);

      return res.json(result);
    } catch (err: any) {
      logger.error(err.stack);
      res.status(err.statusCode).json(err.message);
    }
  }
}
