import { Response } from "express";
import { catchAsync } from "../../hooks/catchAsync";
import { CustomRequest, Iuser } from "../../middleware/authorized";
import documentsService from "./documents.service";

const createDocument = catchAsync(async (req: CustomRequest, res: Response) => {
    const userId = req?.user as Iuser
  const result = await documentsService.createDocument(req.body, userId.id);
  res.send({
    success: true,
    message: "Document created successfully",
    data: result,
  });
});

export default {
  createDocument,
};
