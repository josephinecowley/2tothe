import { BaseEntity, Entity, ManyToMany, PrimaryGeneratedColumn, Column, JoinTable } from "typeorm";

import { Place } from "./Place";

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
}
