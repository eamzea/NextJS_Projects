import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/database';
import EntryModel from '@/database/models/Entry';
import { handleConnection } from '@/utils/dbConnection';
import mongoose from 'mongoose';
import { ENTRY_INTERFACE } from '@/types';

export const getEntries = async (res: NextApiResponse) => {
  const entries = await handleConnection(
    async () => await EntryModel.find().sort({ createdAt: 'ascending' }),
  );

  return res.status(200).json(entries);
};

export const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query;
  try {
    const result = await handleConnection(async () => {
      const entry = await EntryModel.findById(_id);

      if (!entry) {
        return null;
      }

      return entry;
    });

    if (!result) {
      return res.status(400).json({ message: 'Entry does not exist' });
    }

    return res.status(201).json(result);
  } catch (error) {}
};

export const postEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { description = '' } = req.body;

  try {
    const result = await handleConnection(async () => {
      const entry = new EntryModel({ description, createdAt: Date.now() });
      await entry.save();

      return entry;
    });

    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    await db.disconnect();

    return res.status(400).json({ message: 'Something bad happened' });
  }
};

export const putEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query;

  try {
    const result = await handleConnection(async () => {
      const entry = await EntryModel.findById(_id);

      if (!entry) {
        return null;
      }

      const { description = entry.description, status = entry.status } = req.body;

      const entryUpdated = await EntryModel.findByIdAndUpdate(
        _id,
        { description, status },
        { runValidators: true, new: true },
      );

      return entryUpdated;
    });

    if (!result) {
      return res.status(400).json({ message: 'Entry does not exist' });
    }

    return res.status(201).json(result);
  } catch (error) {}
};

export const deleteEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query;

  try {
    await handleConnection(async () => {
      const entry = await EntryModel.findById(_id);

      if (!entry) {
        return null;
      }

      const entryUpdated = await EntryModel.findByIdAndDelete(
        _id
      );

      return;
    });

    return res.status(201).json({message: 'Entry deleted successfully'});
  } catch (error) {}
};
