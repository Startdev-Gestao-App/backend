import { Request, Response } from "express";
import bcrypt from "bcrypt";
import multer from "multer";
import { prisma } from "../services/prisma";
import {
  userValidation,
  userUpdateValidation,
} from "../validations/user.validation";
import {
  createUser,
  getAll,
  getById,
  updateUser,
  deleteUser,
} from "../repositories/user.repository";

export const create = async (req: Request, res: Response) => {
  try {
    await userValidation.validate(req.body);

    const encryptedPassword: string = await bcrypt.hash(req.body.password, 10);
    req.body.password = encryptedPassword;

    await createUser(req.body);
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const skip = Number(req?.query?.skip) || 0;
    const take = Number(req?.query?.take) || 20;
    const users = await getAll(skip, take);
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getId = async (req: Request, res: Response) => {
  try {
    const user = await getById(Number(req.params.id));
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    await userUpdateValidation.validate(req.body);
    await updateUser(Number(req.params.id), req.body);
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await deleteUser(Number(req.params.id));
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
};

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, `${__dirname}/../public/avatar`);
      },
      filename: function (req: any, file: any, cb: any) {
        cb(null, Date.now() + ".jpg");
      },
    });

    const upload = multer({ storage }).single("file");

    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).send(err);
      } else if (err) {
        return res.status(500).send(err);
      }

      await prisma.user.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          avatar: `/public/avatar/${req.file?.filename}`,
        },
      });

      res.status(201).send();
    });
  } catch (e) {
    res.status(400).send(e);
  }
};
