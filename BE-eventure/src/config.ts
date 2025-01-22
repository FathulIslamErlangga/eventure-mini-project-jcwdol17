import "dotenv/config";

export const PORT: number =
  process.env.PORT !== null ? parseInt(process.env.PORT!) : 3500;
