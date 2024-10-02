import mongoose, { Schema, Document, Model } from 'mongoose';

// Define a TypeScript interface for User
export type IUser = Document & {
  username: string;
  email: string;
  password: string;
};

// Define the schema for User
const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Check if the model is already defined to avoid OverwriteModelError
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export { User };
