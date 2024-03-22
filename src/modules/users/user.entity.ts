import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ADMIN, FEMALE, MALE, OTHER, USER } from '@/core/constant/index';

@Table
export class Users extends Model<Users> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;
  @Column({
    type: DataType.INTEGER,
    unique: true,
  })
  phone: number;

  @Column({
    type: DataType.ENUM,
    values: [ADMIN, USER],
    defaultValue: USER,
  })
  role: string;

  @Column({
    type: DataType.ENUM,
    values: [MALE, FEMALE, OTHER],
    allowNull: true,
  })
  gender: string;

  @Column({
    type: DataType.DATE,
  })
  dob: Date;
}
