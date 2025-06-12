import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    email: {type: String, required: true, unique: true}
  },
  {
    timestamps: true,
  }
);

export const user = model<TUser>("user", userSchema);
