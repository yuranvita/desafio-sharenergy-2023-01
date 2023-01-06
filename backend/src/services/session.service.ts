import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { prisma } from "../prisma/prisma";
import { IUser } from "../types/user";

class SessionService {
  async execute({ username, password }: IUser) {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      throw new AppError("User or Password incorrect!", 403);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("User or Password incorrect!", 403);
    }

    const token = sign(
      {
        username: user.username,
        id: user.id,
      },
      process.env.SECRET_KEY!,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { SessionService };
