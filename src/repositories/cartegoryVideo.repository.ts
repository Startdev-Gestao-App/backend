import { prisma } from "../services/prisma";
import CategoryVideo from "../models/categoryVideo.model";

export const createCategory = async (data: CategoryVideo) => {
  const category = await prisma.categoryVideo.create({
    data,
  });
  return category;
};

export const getAll = async () => {
  const categorys = await prisma.categoryVideo.findMany({});
  return categorys;
};

export const getById = async (id: number) => {
  const category = await prisma.categoryVideo.findUnique({
    where: {
      id,
    },
  });
  return category;
};

export const updateCategory = async (id: number, data: CategoryVideo) => {
  const category = await prisma.categoryVideo.update({
    where: {
      id,
    },
    data,
  });
  return category;
};

export const deleteCategory = async (id: number) => {
  await prisma.categoryVideo.delete({
    where: {
      id,
    },
  });
  return;
};
