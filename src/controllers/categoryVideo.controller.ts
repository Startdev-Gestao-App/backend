import { Request, Response } from "express";
import { categoryVideoValidation } from "../validations/categoryVideo.validation";
import {
  createCategory,
  getAll,
  getById,
  updateCategory,
  deleteCategory,
} from "../repositories/cartegoryVideo.repository";

export const create = async (req: Request, res: Response) => {
  try {
    await categoryVideoValidation.validate(req.body);
    const category = await createCategory(req.body);
    res.status(200).send(category);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const categorys = await getAll();
    res.status(200).send(categorys);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getId = async (req: Request, res: Response) => {
  try {
    const category = await getById(Number(req.params.id));
    res.status(200).send(category);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const category = await updateCategory(Number(req.params.id), req.body);
    res.status(200).send(category);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await deleteCategory(Number(req.params.id));
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};
