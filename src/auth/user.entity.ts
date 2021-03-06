import { hash } from 'bcrypt';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Routine } from '../routines/routines.entity';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    nullable: true,
  })
  height: number;

  @Column({
    nullable: true,
  })
  weight: number;

  // 1 to 5
  @Column({
    nullable: true,
  })
  level: number;

  @Column({
    nullable: true,
  })
  metricUnits: boolean;

  @OneToMany(
    type => Routine,
    routine => routine.user,
    { eager: true },
  )
  routines: Routine[];

  async validatePassword(password: string): Promise<boolean> {
    const hashCode = await hash(password, this.salt);
    return hashCode === this.password;
  }
}
