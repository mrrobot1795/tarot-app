import mongoose, { Schema, Document, Model } from 'mongoose';

// Define a TypeScript interface for Reading
export type IReading = Document & {
  question: string;
  cards: string[];
  interpretation: string;
  userId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
};

// Define the schema for Reading
const readingSchema: Schema<IReading> = new Schema({
  question: { type: String, required: true },
  cards: { type: [String], required: true },
  interpretation: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

// Check if the model is already defined to avoid OverwriteModelError
const Reading: Model<IReading> = mongoose.models.Reading || mongoose.model<IReading>('Reading', readingSchema);

export { Reading };
