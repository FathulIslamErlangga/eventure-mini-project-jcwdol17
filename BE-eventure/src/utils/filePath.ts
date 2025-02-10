import path from "path";
import { ValidationRequest } from "./interfaceCustom";

export const getFilePath = (filePath: string, req: ValidationRequest) =>
  `${req.protocol}://${req.get("host")}/public/uploads/${path.basename(
    filePath
  )}`;
