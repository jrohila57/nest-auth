import { Model, BuildOptions } from 'sequelize';

export interface OtpAttributes {
  readonly code: string;
  readonly userId: number;
  readonly expireAt: Date;
  readonly type: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface OtpInstance extends Model<OtpAttributes>, OtpAttributes {}

export type OtpModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): OtpInstance;
};
