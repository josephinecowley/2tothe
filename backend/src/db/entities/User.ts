import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Place } from "./Place";
import { UserAnswer } from "./UserAnswer";
import { IUserWithID } from "../auth/extendExpress";

@Entity()
export class User extends BaseEntity implements IUserWithID {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // TODO: Make non-nullable
  @Column({ nullable: true })
  nickname!: string;

  // TODO: Make non-nullable
  @ManyToOne(() => Place, { nullable: true })
  place!: Place;

  @OneToMany(() => UserAnswer, (a) => a.user)
  answers!: UserAnswer[];

  @Column({ unique: true })
  phoneNumber!: string;
}
