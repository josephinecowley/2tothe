import { BaseEntity, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import { Question } from "./Question";
import { User } from "./User";

@Entity()
export class UserAnswer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Question)
  question!: Question;

  @ManyToOne(() => User)
  user!: User;

  @Column()
  answer!: string;
}
