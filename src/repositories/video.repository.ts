import { prisma } from "../services/prisma";
import Video from "../models/video.model";

export const createVideo = async (data: Video) => {
  const video = await prisma.video.create({
    data,
  });
  return video;
};

export const getAll = async (skip: number, take: number) => {
  const [videos, total] = await prisma.$transaction([
    prisma.video.findMany({
      skip,
      take,
    }),
    prisma.video.count(),
  ]);
  const totalPage = Math.ceil(total / take);

  return { total, totalPage, videos };
};

export const getById = async (id: number) => {
  const video = await prisma.video.findUnique({
    where: {
      id,
    },
  });
  return video;
};

export const updateVideo = async (id: number, data: Video) => {
  const video = await prisma.video.update({
    where: {
      id,
    },
    data,
  });
  return video;
};

export const deleteVideo = async (id: number) => {
  await prisma.video.delete({
    where: {
      id,
    },
  });
  return;
};

export const getByCategory = async (
  categoryId: number,
  skip: number,
  take: number
) => {
  const [videos, total] = await prisma.$transaction([
    prisma.video.findMany({
      where: {
        categoryId,
      },
      orderBy: {
        id: "desc",
      },
      skip,
      take,
    }),
    prisma.video.count({
      where: {
        categoryId,
      },
    }),
  ]);

  const totalPage = Math.ceil(total / take);

  return { total, totalPage, videos };
};
