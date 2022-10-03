export const calcDaysMonth = async (date: string) => {
  const month = date.substring(0, 2);
  const year = date.substring(3);

  const generateDate = await new Date(Number(year), Number(month), 0);
  const total = generateDate.getDate();
  return { month, year, total };
};
