import mongoose, { Schema, Document, Model } from "mongoose";

export type IUser = Document & {
  username: string;
  email: string;
  password: string;
};

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export { User };
