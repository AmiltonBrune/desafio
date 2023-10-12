import * as mongoose from 'mongoose';
import { IItem } from '../interfaces/items.interface';

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
}

export const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name can not be empty'],
    },
    description: String,
    user_id: {
      type: String,
      required: [true, 'User can not be empty'],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
  },
);

ItemSchema.pre('validate', function (next) {
  const self = this as IItem;

  if (this.isModified('user_id') && self.created_at) {
    this.invalidate('user_id', 'The field value can not be updated');
  }
  next();
});
