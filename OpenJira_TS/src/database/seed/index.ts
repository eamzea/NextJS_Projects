import { ENTRY_INTERFACE } from "@/types"

interface SEED_INTERFACE {
  entries: Omit<ENTRY_INTERFACE, '_id'>[]
}

export const seed: SEED_INTERFACE = {
  entries: [
    {
      description: 'Ea excepteur cillum amet nostrud.',
      createdAt: Date.now(),
      status: 'pending',
    },
    {
      description: 'Qui esse cillum aliqua occaecat voluptate sunt eu non.',
      createdAt: Date.now(),
      status: 'in-progress',
    },
    {
      description: 'Fugiat non enim irure consectetur sunt mollit.',
      createdAt: Date.now(),
      status: 'done',
    },
  ],
};
