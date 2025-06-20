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

const getDocuments = catchAsync(async (req: CustomRequest, res: Response) => {
    const userId = req?.user as Iuser
  const result = await documentsService.getDocuments(userId.id);
  res.send({
    success: true,
    message: "Documents fetched successfully",
    data: result,
  });
});

const updateDocument = catchAsync(async (req: CustomRequest, res: Response) => {
  const result = await documentsService.updateDocument(req.params.id, req.body);
  res.send({
    success: true,
    message: "Document updated successfully",
    data: result,
  });
});

const deleteDocument = catchAsync(async (req: CustomRequest, res: Response) => {
  const result = await documentsService.deleteDocument(req.params.id);
  res.send({
    success: true,
    message: "Document deleted successfully",
    data: result,
  });
});

const getDocument = catchAsync(async (req: CustomRequest, res: Response) => {
  const user = req?.user as Iuser
  const result = await documentsService.getDocument(req.params.id, user);
  res.send({
    success: true,
    message: "Document fetched successfully",
    data: result.result,
    role: result.role
  });
});

const sharedWith = catchAsync(async (req: CustomRequest, res: Response) => {
  const result = await documentsService.sharedWith(req.body, req.params.id);
  res.send({
    success: true,
    message: "Document shared successfully",
    data: result,
  });
})

export default {
  createDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
  getDocument,
  sharedWith,
};
