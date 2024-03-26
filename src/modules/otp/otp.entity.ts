import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Users } from '../users/user.entity';
import { FORGOT, RESET, VERIFY } from '@/core/constant';

@Table
export class Otp extends Model<Otp> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  code: string;

  @Column({
    type: DataType.DATE,
  })
  expireAt: Date;

  @ForeignKey(() => Users)
  @Column({ field: 'user_id', type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => Users)
  user: Users;

  @Column({
    type: DataType.ENUM,
    values: [RESET, FORGOT, VERIFY],
    defaultValue: 'VERIFY',
  })
  type: string;
}
