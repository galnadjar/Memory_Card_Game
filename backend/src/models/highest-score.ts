import mongoose, { type InferSchemaType } from 'mongoose';

const highScoreSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    highScore: { type: Number, required: true },
  },
  { timestamps: true },
);

export type HighScoreDoc = InferSchemaType<typeof highScoreSchema>;

export const HighScoreModel = mongoose.model('HighScore', highScoreSchema);
