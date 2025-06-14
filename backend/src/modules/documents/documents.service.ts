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

export default {
    createDocument
}