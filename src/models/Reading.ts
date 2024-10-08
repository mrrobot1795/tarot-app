import mongoose, { Schema, Document, Model } from "mongoose";

export type IReading = Document & {
  question: string;
  cards: string[];
  interpretation: string;
  userId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
};

const readingSchema: Schema<IReading> = new Schema({
  question: { type: String, required: true },
  cards: { type: [String], required: true },
  interpretation: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Reading: Model<IReading> =
  mongoose.models.Reading || mongoose.model<IReading>("Reading", readingSchema);

export { Reading };
