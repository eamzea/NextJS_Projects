import db from "@/database";
import EntryModel from "@/database/models/Entry";
import { isValidObjectId } from "mongoose";

export const handleConnection = async (fn: () => Promise<any>) => {
  await db.connect();
  const result = await fn()
  await db.disconnect();

  return result
};

export const getEntryById = async (id: string) => {
  if (!isValidObjectId(id)) return null

  return await handleConnection(async () => await EntryModel.findById(id).lean())
}
