import { Gender, Role } from '@/core/constant/enum';

export const authProperties = {
  firstName: {
    example: 'John',
    description: 'The first name of the user.',
  },
  lastName: {
    example: 'Doe',
    description: 'The last name of the user.',
  },
  email: {
    example: 'john.doe@example.com',
    description: 'The email address of the user.',
  },
  password: {
    example: 'password123',
    description: 'The password for the user account.',
  },
  phone: {
    example: '+1234567890',
    description: 'The phone number of the user.',
  },
  role: {
    enum: Role,
    description: 'The role of the user.',
  },
  gender: {
    enum: Gender,
    description: 'The gender of the user.',
  },
  dob: {
    example: '1990-01-01',
    description: 'The date of birth of the user in YYYY-MM-DD format.',
  },
};
