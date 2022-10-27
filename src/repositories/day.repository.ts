import { prisma } from "../services/prisma";
import Day from "../models/day.model";

export const createDay = async (data: Day[]) => {
  await prisma.day.createMany({
    data,
    skipDuplicates: true,
  });
  return;
};

export const getByWeek = async (weekId: number) => {
  const days = await prisma.day.findMany({
    where: {
      weekId,
    },
    orderBy: {
      id: "asc",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: false,
          admin: false,
          avatar: true,
          password: false,
          createdAt: false,
          updatedAt: false,
        },
      },
    },
  });
  return days;
};

export const getById = async (id: number) => {
  const day = await prisma.day.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: false,
          admin: false,
          avatar: true,
          password: false,
          createdAt: false,
          updatedAt: false,
        },
      },
      Attachments: true,
      Video: true,
    },
  });
  return day;
};

export const updateDay = async (id: number, data: Day) => {
  await prisma.day.update({
    where: {
      id,
    },
    data,
  });
  return;
};

export const deleteDay = async (id: number) => {
  await prisma.day.delete({
    where: {
      id,
    },
  });
  return;
};
