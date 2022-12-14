import { prisma } from "../services/prisma";

export const getUserEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return user;
};
