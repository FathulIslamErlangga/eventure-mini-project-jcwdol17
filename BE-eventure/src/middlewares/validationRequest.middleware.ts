import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export const validateRequest =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });

      if (error) {
        // Ambil semua pesan error dari hasil validasi Joi
        const errors = error.details.map((detail) =>
          detail.message.replace(/\"/g, "")
        );

        res.status(400).json({
          status: "error",
          message: "Validation error",
          errors,
        });
        return;
      }

      next();
    } catch (err) {
      next(err);
    }
  };
