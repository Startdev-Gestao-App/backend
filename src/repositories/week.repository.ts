import { prisma } from "../services/prisma";
import Week from "../models/week.model";

export const createWeek = async (data: Week[]) => {
  await prisma.week.createMany({
    data,
    skipDuplicates: true,
  });
  return;
};

export const getByMonth = async (date: string) => {
  const weeks = await prisma.week.findMany({
    where: {
      date,
    },
    orderBy: {
      id: "asc",
    },
  });
  return weeks;
};

export const getById = async (id: number) => {
  const week = await prisma.week.findUnique({
    where: {
      id,
    },
  });
  return week;
};

export const updateWeek = async (id: number, data: Week) => {
  await prisma.week.update({
    where: {
      id,
    },
    data,
  });
  return;
};

export const deleteWeek = async (id: number) => {
  await prisma.week.delete({
    where: {
      id,
    },
  });
  return;
};
