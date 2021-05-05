import { Schema, Document, model, Date } from 'mongoose';

export interface Blog extends Document {
  title: string;
  date: Date;
  body: string;
}

const BlogSchema = new Schema<Blog>({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

export default model<Blog>('Blog', BlogSchema);
