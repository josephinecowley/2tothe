import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NewUser extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  phoneNumber!: string;

  isNewUser: true = true;
}
