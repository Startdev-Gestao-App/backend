import { prisma } from "../services/prisma";

type Week = {
  id?: number | null;
  name?: string | null;
  date?: string | null;
  priority?: string | null;
  type?: string | null;
};

type Days = {
  name: string;
  day: string;
  weekId: number;
};

export const generateDay = async (
  totalDays: number,
  weeks: Week[],
  month: string,
  year: string
) => {
  const nameDays = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];

  let day = 0;

  weeks.map(async (value, i) => {
    let arrayDays: Days[] = [];
    for (let i = 1; i <= 7; i++) {
      if (day < totalDays) {
        day = day + 1;
        const dayWeek = new Date(Number(year), Number(month) - 1, day);
        arrayDays.push({
          name: nameDays[dayWeek.getDay()],
          day: String(day),
          weekId: Number(value.id),
        });
      }
    }
    const data = arrayDays;
    await prisma.day.createMany({
      data,
    });
  });
};
