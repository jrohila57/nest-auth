import { Model, BuildOptions } from 'sequelize';

export type Gender = 'male' | 'female' | 'other';
export type Role = 'admin' | 'user';

export interface UserAttributes {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly gender: Gender;
  readonly role: Role;
  readonly dob: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

export type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserInstance;
};
