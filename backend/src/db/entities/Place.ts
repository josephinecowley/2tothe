import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Question } from "./Question";
import { ScheduledQuestion } from "./ScheduledQuestion";

@Entity()
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  placeName!: string;

  @Column()
  population!: number;

  @ManyToMany(() => Question, (q) => q.whitelistedPlaces)
  whitelistedQuestions!: Question[];
}
