import { v2 as cloudinary } from "cloudinary";
import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req: Request, file: Express.Multer.File) => ({
    resource_type: "image",
    public_id: `${file.fieldname}-${Date.now()}-${path.extname(
      file.originalname
    )}`,
    format: "png",
  }),
});
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  const allowedFormat = /jpeg|jpg|png/;
  const type = allowedFormat.test(file.mimetype);
  const nameformat = allowedFormat.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (type && nameformat) {
    return callback(null, true);
  } else {
    return new Error(
      "file type not allowed format. only JPG,PNG,and JPEG are allowed"
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fieldSize: 1024 * 1024 * 4,
  },
});

export default upload;
