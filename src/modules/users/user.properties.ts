import { Gender, Role } from '@/core/constant/enum';

export const userProperties = {
  firstName: {
    example: 'John',
    required: true,
    description: 'The first name of the user.',
  },
  lastName: {
    example: 'Doe',
    required: true,
    description: 'The last name of the user.',
  },
  email: {
    example: 'john.doe@example.com',
    required: true,
    description: 'The email address of the user.',
  },
  phone: {
    example: '+1234567890',
    required: true,
    description: 'The phone number of the user.',
  },
  role: {
    enum: Role,
    required: true,
    description: 'The role of the user.',
  },
  gender: {
    enum: Gender,
    required: true,
    description: 'The gender of the user.',
  },
  isVerified: {
    example: 'true',
    required: false,
    description: 'Email verified or not',
  },
  dob: {
    example: '1990-01-01',
    required: true,
    description: 'The date of birth of the user in YYYY-MM-DD format.',
  },
  password: {
    example: 'password123',
    required: true,
    description: 'The password for the user account.',
  },
};
