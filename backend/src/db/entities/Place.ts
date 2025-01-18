import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Question } from "./Question";

@Entity()
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  placeName!: string;

  @Column()
  population!: number;

  @ManyToMany(() => Question, (q) => q.places)
  whitelistedQuestions!: Question[];
}
