import { mockWedding } from './mockWedding';

export const mockUser = {
  id: 'c4b8390d-3c2c-4e8e-9f4d-5c6b84ccf3b9',
  email: 'example@email.com',
  firstName: 'John',
  lastName: '',
  password: '$2b$10$cmO2pzsI4aG5oQ13NtIlW.gvuu5M.0lDa/ofsSIoYD/hffzzTenpi', // hash for password 'password'
  createdAt: '2025-01-01',
  weddingsOwn: [mockWedding],
};
