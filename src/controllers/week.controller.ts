import { Request, Response } from "express";
import { calcDaysMonth } from "../services/calcDaysMonth";
import { generateDay } from "../services/generateDays";
import {
  weekValidation,
  weekUpdateValidation,
} from "../validations/week.validation";
import {
  createWeek,
  getByMonth,
  getById,
  updateWeek,
  deleteWeek,
} from "../repositories/week.repository";

export const create = async (req: Request, res: Response) => {
  try {
    await weekValidation.validate(req.body);
    await createWeek(req.body);
    const days = await getByMonth(String(req.body[0].date));
    const totalDays = await calcDaysMonth(String(req.body[0].date));
    await generateDay(totalDays.total, days, totalDays.month, totalDays.year);
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const weeks = await getByMonth(String(req?.query?.date));
    res.status(200).send(weeks);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getId = async (req: Request, res: Response) => {
  try {
    const week = await getById(Number(req.params.id));
    res.status(200).send(week);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    await weekUpdateValidation.validate(req.body);
    await updateWeek(Number(req.params.id), req.body);
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await deleteWeek(Number(req.params.id));
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
};
