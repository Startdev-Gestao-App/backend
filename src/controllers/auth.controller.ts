import { prisma } from "../services/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authValidation } from "../validations/auth.validation";
import { getUserEmail } from "../repositories/auth.repository";

export const authenticate = async (req: Request, res: Response) => {
  try {
    await authValidation.validate(req.body);
    const { email, password } = req.body;

    const user = await getUserEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Usuário e/ou senha incorretos" });
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          admin: user.admin,
          name: user.name,
        },
        String(process.env.TOKEN_KEY),
        {
          expiresIn: "1h",
        }
      );

      const decode = await jwt.decode(token);

      return res.status(200).json({ token, decode });
    } else {
      return res.status(400).json({ message: "Usuário inválido" });
    }
  } catch (e) {
    return res.status(500).json(e);
  }
};

export const validate = async (req: Request, res: Response) => {
  try {
    if (!req.body.token) {
      return res.status(400).json({ message: "Nessário informar o token" });
    }

    const decode = await jwt.decode(req.body.token);

    return res.status(200).send(decode);
  } catch (e) {
    return res.status(500).send(e);
  }
};
