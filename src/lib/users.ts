
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin' | 'writer';
  verificationStatus: 'pending' | 'approved' | 'rejected';
  novelsWritten: number;
  joinedDate: string; // ISO 8601 date string
  coins: number;
  isSuspended: boolean;
}

export const users: User[] = [
  {
    id: 'user-admin-001',
    name: 'Admin Utama',
    email: 'admin@novelku.com',
    avatar: 'https://i.pravatar.cc/150?u=admin001',
    role: 'admin',
    verificationStatus: 'approved',
    novelsWritten: 8,
    joinedDate: '2023-01-15T10:00:00Z',
    coins: 99999,
    isSuspended: false,
  },
  {
    id: 'user-writer-002',
    name: 'Bunga Mawar',
    email: 'bunga@example.com',
    avatar: 'https://i.pravatar.cc/150?u=writer002',
    role: 'writer',
    verificationStatus: 'approved',
    novelsWritten: 3,
    joinedDate: '2023-05-20T14:30:00Z',
    coins: 1500,
    isSuspended: false,
  },
  {
    id: 'user-writer-003',
    name: 'Pendekar Langit',
    email: 'pendekar@example.com',
    avatar: 'https://i.pravatar.cc/150?u=writer003',
    role: 'writer',
    verificationStatus: 'pending',
    novelsWritten: 1,
    joinedDate: '2024-06-10T09:00:00Z',
    coins: 250,
    isSuspended: false,
  },
    {
    id: 'user-writer-004',
    name: 'Ayu Lestari',
    email: 'ayu@example.com',
    avatar: 'https://i.pravatar.cc/150?u=writer004',
    role: 'writer',
    verificationStatus: 'rejected',
    novelsWritten: 0,
    joinedDate: '2024-07-01T11:00:00Z',
    coins: 0,
    isSuspended: true,
  },
   {
    id: 'user-reader-005',
    name: 'Rian Pembaca',
    email: 'rian@example.com',
    avatar: 'https://i.pravatar.cc/150?u=reader005',
    role: 'user',
    verificationStatus: 'approved',
    novelsWritten: 0,
    joinedDate: '2024-02-22T18:00:00Z',
    coins: 120,
    isSuspended: false,
  },
];
