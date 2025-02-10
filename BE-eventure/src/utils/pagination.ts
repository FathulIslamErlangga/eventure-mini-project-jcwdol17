export const pagination = (page: number, limit: number = 5) => {
  const pageNumber = Math.max(1, page); // Pastikan page minimal 1
  const take = limit;
  const skip = (pageNumber - 1) * take;

  return { skip, take, pageNumber };
};
