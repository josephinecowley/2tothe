import { BaseEntity, Entity, ManyToMany, PrimaryGeneratedColumn, Column, JoinTable, OneToMany } from "typeorm";

import { Place } from "./Place";
import { ScheduledQuestion } from "./ScheduledQuestion";
import { UserAnswer } from "./UserAnswer";

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("text")
  text!: string;

  @Column("text")
  choiceA!: string;

  @Column("text")
  choiceB!: string;

  @ManyToMany(() => Place, (p) => p.whitelistedQuestions)
  @JoinTable()
  whitelistedPlaces!: Place[];
  // TODO: add tags / topics

  @OneToMany(() => ScheduledQuestion, (q) => q.question)
  scheduledQuestions!: ScheduledQuestion[];

  @OneToMany(() => UserAnswer, (ua) => ua.question)
  userAnswers!: UserAnswer[];

  @Column({ default: false })
  timeless!: boolean;

  @Column({ generated: "increment" })
  publicNumber!: number;
}
