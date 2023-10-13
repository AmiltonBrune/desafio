import { Document } from 'mongoose';

export interface IItem extends Document {
  name: string;
  description: string;
  user_id: string;
  created_at: number;
}
