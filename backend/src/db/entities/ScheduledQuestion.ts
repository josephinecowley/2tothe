import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Question } from "./Question";

@Entity()
export class ScheduledQuestion extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("timestamptz")
  date!: Date;

  @ManyToOne(() => Question)
  question!: Question;
}
