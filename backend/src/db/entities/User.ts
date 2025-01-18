import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Place } from "./Place";
import { UserAnswer } from "./UserAnswer";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  nickname!: string;

  @ManyToOne(() => Place)
  place!: Place;

  @OneToMany(() => UserAnswer, (a) => a.user)
  answers!: UserAnswer[];
}
