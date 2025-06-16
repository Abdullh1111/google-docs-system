import { Schema, model } from "mongoose";
import { TDocument } from "./documents.interface";

const DocumentSchema = new Schema<TDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sharedWith: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

export const DocumentModel = model<TDocument>("Document", DocumentSchema);
