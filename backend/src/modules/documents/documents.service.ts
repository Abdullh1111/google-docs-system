import { Types } from "mongoose";
import { AppError } from "../../hooks/AppError";
import { DocumentModel } from "./document.model";
import { TDocument } from "./documents.interface";

const createDocument = async (data: TDocument, userId: Types.ObjectId) => {
    if(!data.title || !data.content) {
        throw new AppError(400, "Title and content are required")
    }

    data.userId = userId
    const result = await DocumentModel.create(data);
    return result;
}

const getDocuments = async (userId: Types.ObjectId) => {
    const result = await DocumentModel.find({userId})
    return result
}

const updateDocument = async (id: string, data: Partial<TDocument>) => {
    const result = await DocumentModel.findByIdAndUpdate(id, data)
    return result
}

const deleteDocument = async (id: string) => {
    const result = await DocumentModel.findByIdAndDelete(id)
    return result
}

const getDocument = async (id: string) => {
    const result = await DocumentModel.findById(id)
    return result
}

export default {
    createDocument,
    getDocuments,
    updateDocument,
    deleteDocument,
    getDocument
}