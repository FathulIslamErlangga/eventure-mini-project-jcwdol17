import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "public/uploads");
  },
  filename(req, file, callback) {
    const pathName = path.extname(file.originalname);
    callback(null, `${file.fieldname}-${Date.now()}-${pathName}`);
  },
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
