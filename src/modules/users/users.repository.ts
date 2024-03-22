import { USER_REPOSITORY } from '@/core/constant';
import { Users } from './user.entity';

export const usersRepository = [
  {
    provide: USER_REPOSITORY,
    useValue: Users,
  },
];
