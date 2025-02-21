import path from "path";
import { ValidationRequest } from "./interfaceCustom";

export const getFilePath = (filePath: string, req: ValidationRequest) =>
  `${req.file.path}`;

