import { Request, Response } from "express";
import {
  dayValidation,
  dayUpdateValidation,
} from "../validations/day.validation";
import {
  createDay,
  getByWeek,
  getById,
  updateDay,
  deleteDay,
} from "../repositories/day.repository";

export const create = async (req: Request, res: Response) => {
  try {
    await dayValidation.validate(req.body);
    await createDay(req.body);
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const days = await getByWeek(Number(req?.query?.weekId));
    res.status(200).send(days);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getId = async (req: Request, res: Response) => {
  try {
    const day = await getById(Number(req.params.id));
    res.status(200).send(day);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    await dayUpdateValidation.validate(req.body);
    await updateDay(Number(req.params.id), req.body);
    res.status(201).send();
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await deleteDay(Number(req.params.id));
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
};
