import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { ValidationRequest } from "../utils/interfaceCustom";

export const validateRequest =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Merge `req.body` with `req.files`
      const requestData = {
        ...req.body,
      };

      const { error } = schema.validate(requestData, { abortEarly: false });

      if (error) {
        const errors = error.details.map((detail) =>
          detail.message.replace(/\"/g, "")
        );

        res.status(400).json({
          status: "error",
          message: "Validation error",
          errors,
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
