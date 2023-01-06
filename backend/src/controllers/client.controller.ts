import { Request, Response } from "express";
import { ClientService } from "../services/client.service";

class ClientController {
  async create(req: Request, res: Response) {
    const data = req.body;
    const { userId } = req;
    const clientService = new ClientService();

    const client = await clientService.create(data, userId);

    return res.status(201).json(client);
  }

  async listAll(req: Request, res: Response) {
    const clientService = new ClientService();

    const clients = await clientService.listAll();

    res.status(200).json(clients);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const clientService = new ClientService();

    await clientService.delete(id);

    return res.status(204).json();
  }
  async findFirst(req: Request, res: Response) {
    const clientService = new ClientService();

    const { id } = req.params;

    const user = await clientService.findFirst(id);

    return res.status(200).json(user);
  }

  async update(req: Request, res: Response) {
    const clientService = new ClientService();

    const { id } = req.params;
    const data = req.body;

    const message = await clientService.editClient(id, data);

    return res.status(200).json(message);
  }
}

export { ClientController };
