
import { v2 as cloudinary } from 'cloudinary';
import { CustomRequest } from '../middleware/authorized';
import { NextFunction, Response } from 'express';
import config from '.';
import { AppError } from '../hooks/AppError';

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME!,
  api_key: config.CLOUDINARY_API_KEY!,
  api_secret: config.CLOUDINARY_API_SECRET!,
});

export async function uploadImage(req: CustomRequest,res: Response,  next: NextFunction) {
   try {
    if(!req.file) throw new AppError(400, "Image not found");

    const base64 = req.file.buffer.toString('base64');
    const dataUri = `data:${req.file.mimetype};base64,${base64}`;
    const result = await cloudinary.uploader.upload(dataUri);
    console.log(result);
    const body = {
      ...req.body,
      avatar: result.secure_url,}
      req.user = body
  next();
   } catch (error) {
    console.log(error);
    next(error);
   }
}
export default cloudinary;
