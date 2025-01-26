import Joi from "joi";

// * Skema validasi untuk endpoint Register User

export const registerUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
});

//  Skema validasi untuk endpoint Login User

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

//  Skema validasi untuk endpoint profile
export const profileUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  phone: Joi.string()
    .min(10)
    .max(15)
    .pattern(/^(?:\+62|62|0)8\d{8,11}$/)
    .optional(),
  address: Joi.string().min(5).max(255).optional(),
  city: Joi.string().min(3).max(100).optional(),
  file: Joi.object({
    filename: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/jpg")
      .optional(), // Validasi jenis file
  }).optional(),
});
