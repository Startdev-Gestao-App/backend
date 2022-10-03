import { prisma } from "../services/prisma";
import User from "../models/user.model";

export const createUser = async (data: User) => {
  await prisma.user.create({
    data,
  });
  return;
};

export const getAll = async (skip: number, take: number) => {
  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      skip,
      take,
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        createdAt: false,
        updatedAt: false,
      },
    }),
    prisma.user.count(),
  ]);

  const totalPage = Math.ceil(total / take);

  return { total, totalPage, users };
};

export const getById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      createdAt: false,
      updatedAt: false,
    },
  });
  return user;
};

export const updateUser = async (id: number, data: User) => {
  await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return;
};

export const deleteUser = async (id: number) => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
  return;
};
