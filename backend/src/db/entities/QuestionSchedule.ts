import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";

@Entity()
export class QuestionSchedule extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("timestamptz")
  date!: Date;

  @ManyToOne(() => Question)
  question!: Question;
}
