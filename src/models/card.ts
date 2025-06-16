import mongoose, { ObjectId, Schema } from 'mongoose';

export interface ICard {
  name: string,
  link: string,
  owner: ObjectId,
  likes: ObjectId[],
  createdAt: Date
}

const cardSchema = new Schema<ICard>({
  name: {
    type: String, required: true, minlength: 2, maxlength: 30,
  },
  link: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  likes: {
    type: [Schema.Types.ObjectId], ref: 'user', required: true, default: [],
  },
  createdAt: { type: Date, required: true, default: Date.now() },
}, { versionKey: false });

export default mongoose.model<ICard>('card', cardSchema);
