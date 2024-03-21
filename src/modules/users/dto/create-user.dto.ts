import { Gender, Role } from '@/core/constant/enum';
export class CreateUserDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: number;
  readonly role: Role;
  readonly gender: Gender;
  readonly dob: Date;
}
