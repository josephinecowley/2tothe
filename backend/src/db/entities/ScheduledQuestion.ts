import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Question } from "./Question";
import { Place } from "./Place";

@Entity()
export class ScheduledQuestion extends BaseEntity {
  @PrimaryColumn()
  questionID!: Question["id"];

  @PrimaryColumn()
  placeID!: Place["id"];

  @ManyToOne(() => Question, { nullable: false, eager: true })
  @JoinColumn({ name: "questionID" })
  question!: Question;

  @ManyToOne(() => Place, { nullable: false, eager: true })
  @JoinColumn({ name: "placeID" })
  place!: Place;

  @Column("timestamptz")
  dateTime!: Date;
}
