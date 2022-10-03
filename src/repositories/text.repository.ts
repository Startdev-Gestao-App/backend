import { prisma } from "../services/prisma";
import Text from "../models/text.model";

export const createText = async (data: Text) => {
  await prisma.texts.create({
    data,
  });
  return;
};

export const updateText = async (id: number, data: Text) => {
  await prisma.texts.update({
    where: {
      id,
    },
    data,
  });
  return;
};

export const deleteText = async (id: number) => {
  await prisma.texts.delete({
    where: {
      id,
    },
  });
  return;
};
