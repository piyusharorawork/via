import multer from "multer";
import path from "path";
import express, { Express } from "express";
import fs from "fs";
import { getPaths } from "@via/common/path";

export const useMulter = (app: Express) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Generate unique file name
    },
  });

  const upload = multer({ storage });
  const { uploadsDirPath } = getPaths();

  if (!fs.existsSync(uploadsDirPath)) {
    fs.mkdirSync(uploadsDirPath);
  }
  app.use("/uploads", express.static("uploads"));
  return upload;
};
