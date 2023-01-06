import { Request, Response } from "express";
import { SessionService } from "../services/session.service";

class SessionController {
  async execute(req: Request, res: Response) {
    const sessionService = new SessionService();
    const data = req.body;

    const token = await sessionService.execute(data);

    res.status(200).json({ token });
  }
}

export { SessionController };
