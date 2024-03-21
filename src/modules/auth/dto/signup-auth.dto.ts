import { Gender, Role } from '@/core/constant/enum';

export class SignUpAuthDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly phone: number;
  readonly role: Role;
  readonly gender: Gender;
  readonly dob: Date;
}
