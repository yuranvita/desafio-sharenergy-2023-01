import { Request, Response } from "express";
import { UserService } from "../services/user.service";

class UserController {
  async create(req: Request, res: Response) {
    const userService = new UserService();

    const data = req.body;

    const user = await userService.create(data);

    res.status(201).json(user);
  }
}

export { UserController };
