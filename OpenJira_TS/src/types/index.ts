export interface ENTRY_INTERFACE {
  _id: string;
  description: string;
  createdAt: number;
  status: ENTRY_STATUS_TYPE;
}

export type ENTRY_STATUS_TYPE = 'pending' | 'in-progress' | 'done'

export type MONGO_CONNECTION_STATUS =
  | 0 /* Disconnected */
  | 1 /* Connected */
  | 2 /* Connecting */
  | 3 /* Disconnecting */;
