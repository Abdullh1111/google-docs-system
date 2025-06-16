import { Types } from "mongoose";
import { AppError } from "../../hooks/AppError";
import { Iuser } from "../../middleware/authorized";
import { DocumentModel } from "./document.model";
import { TDocument } from "./documents.interface";

const createDocument = async (data: TDocument, userId: Types.ObjectId) => {
  if (!data.title || !data.content) {
    throw new AppError(400, "Title and content are required");
  }

  data.userId = userId;
  const result = await DocumentModel.create(data);
  return result;
};

const getDocuments = async (userId: Types.ObjectId) => {
  const result = await DocumentModel.find({ userId });
  if (!result) {
    throw new AppError(400, "Documents not found");
  }
  return result;
};

const updateDocument = async (id: string, data: Partial<TDocument>) => {
  const result = await DocumentModel.findByIdAndUpdate(id, data);
  if (!result) {
    throw new AppError(400, "Document not found");
  }
  return result;
};

const deleteDocument = async (id: string) => {
  const result = await DocumentModel.findByIdAndDelete(id);
  return result;
};

const getDocument = async (id: string, user: Iuser) => {
  const result = await DocumentModel.findById(id);
  if (!result) {
    throw new AppError(400, "Document not found");
  }
  const isOwner = result.userId.toString() === user.id.toString();
  const hasAccess = result.sharedWith[user.email];

  if (!isOwner && !hasAccess) {
    throw new AppError(403, "You don't have access to this document");
  }
  
  return {
    result,
    role: hasAccess || "VIEWER",
  };
};

const sharedWith = async (
  body: { email: string; role: "EDITOR" | "VIEWER" },
  id: string
) => {
  const { email, role } = body;

  const doc = await DocumentModel.findById(id);
  if (!doc) {
    throw new AppError(400, "Document not found");
  }
  const result = await DocumentModel.findByIdAndUpdate(id, {
    sharedWith:{
      ...doc.sharedWith,
      [email]: role
    }
  })
  // console.log(result);

  return result;
};

export default {
  createDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
  getDocument,
  sharedWith,
};
