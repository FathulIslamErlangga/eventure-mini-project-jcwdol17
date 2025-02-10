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

export const createEventSchema = Joi.object({
  name: Joi.string().trim().min(3).required().messages({
    "string.empty": "Event name cannot be empty.",
    "string.min": "Event name must be at least 3 characters long.",
    "any.required": "Event name is required.",
  }),
  description: Joi.string().min(10).required().messages({
    "string.empty": "Description cannot be empty.",
    "string.min": "Description must be at least 10 characters long.",
    "any.required": "Description is required.",
  }),
  availableSeats: Joi.number().integer().min(1).required().messages({
    "number.base": "Available seats must be a number.",
    "number.integer": "Available seats must be an number.",
    "number.min": "Available seats must be at least 1.",
    "any.required": "Available seats are required.",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number.",
    "number.min": "Price must be at least 0.",
    "any.required": "Price is required.",
  }),
  startDate: Joi.date().iso().required().messages({
    "date.base": "Start date must be a valid date.",
    "date.format": "Start date must be in ISO format.",
    "any.required": "Start date is required.",
  }),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")).required().messages({
    "date.base": "End date must be a valid date.",
    "date.greater": "End date must be later than the start date.",
    "any.required": "End date is required.",
  }),
  address: Joi.object({
    address: Joi.string().required().messages({
      "string.empty": "Address cannot be empty.",
      "any.required": "Address is required.",
    }),
    city: Joi.string().required().messages({
      "string.empty": "City cannot be empty.",
      "any.required": "City is required.",
    }),
  })
    .required()
    .messages({
      "any.required": "Address and city are required.",
    }),
  categoryId: Joi.string().required().messages({
    "string.empty": "Category ID cannot be empty.",
    "any.required": "Category ID is required.",
  }),
});
