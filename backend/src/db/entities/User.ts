import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Place } from "./Place";
import { UserAnswer } from "./UserAnswer";
import { IUserWithID } from "../../auth/extendExpress";

@Entity()
export class User extends BaseEntity implements IUserWithID {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  nickname!: string;

  @ManyToOne(() => Place)
  place!: Place;

  @OneToMany(() => UserAnswer, (a) => a.user)
  answers!: UserAnswer[];

  @Column({ unique: true })
  phoneNumber!: string;

  isNewUser: false = false;
}
