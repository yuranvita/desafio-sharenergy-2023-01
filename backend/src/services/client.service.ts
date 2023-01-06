import { AppError } from "../errors/AppError";
import { prisma } from "../prisma/prisma";
import { client } from "../types/client";

class ClientService {
  async create(data: client, userId: string) {
    const clientExistis = await prisma.client.findFirst({
      where: {
        cpf: data.cpf,
      },
    });

    if (clientExistis) {
      throw new AppError("CPF already exists in database");
    }

    try {
      const client = await prisma.client.create({
        data: {
          cpf: data.cpf,
          address: data.address,
          district: data.district,
          email: data.email,
          houseNumber: Number(data.houseNumber),
          name: data.name,
          phone: data.phone,
          userId: userId,
        },
      });
      return { message: "created client successfully", client };
    } catch (error) {
      return error;
    }
  }

  async listAll() {
    const clients = await prisma.client.findMany();

    return clients;
  }

  async delete(id: string) {
    await prisma.client.delete({
      where: {
        id,
      },
    });

    return;
  }
  async findFirst(id: string) {
    const user = await prisma.client.findFirst({
      where: { id },
    });

    if (!user) {
      return new AppError("user not found", 404);
    }

    return user;
  }

  async editClient(id: string, data: client) {
    const client = await prisma.client.findFirst({
      where: { id },
    });
    if (!client) {
      return new AppError("client not found", 404);
    }

    await prisma.client.update({
      data: {
        address: data.address,
        cpf: data.cpf,
        district: data.district,
        email: data.email,
        houseNumber: Number(data.houseNumber),
        name: data.name,
        phone: data.phone,
      },
      where: {
        id: id,
      },
    });

    return { message: "client updated successfully" };
  }
}

export { ClientService };
