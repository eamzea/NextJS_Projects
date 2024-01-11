import { ENTRY_INTERFACE } from '@/types';
import mongoose, { Model, Schema } from 'mongoose';

interface ENTRY_MODEL_INTERFACE extends ENTRY_INTERFACE {}

const entrySchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'done'],
      message: '{VALUE} not supported',
    },
    default: 'pending',
  },
});

const EntryModel: Model<ENTRY_MODEL_INTERFACE> =
  mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;
