import { prisma } from "../services/prisma";
import Attachment from "../models/attchments.model";

export const createAttachments = async (data: Attachment) => {
  await prisma.attachments.create({
    data,
  });
  return;
};

export const getAttByDay = async (dayId: number) => {
  const attachments = await prisma.attachments.findMany({
    where: {
      dayId,
    },
  });
  return attachments;
};

export const deleteAttachment = async (id: number) => {
  await prisma.attachments.delete({
    where: {
      id,
    },
  });
  return;
};
