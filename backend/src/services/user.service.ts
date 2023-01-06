import { hash } from "bcryptjs";
import { AppError } from "../errors/AppError";
import { prisma } from "../prisma/prisma";
import { IUser } from "../types/user";

class UserService {
  async create({ username, password }: IUser) {
    const userExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (userExists) {
      return new AppError("user already exists", 403);
    }

    const passwordHash = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        username,
        password: passwordHash,
      },
    });

    return { message: "user created successfully", user: user };
  }
}

export { UserService };
