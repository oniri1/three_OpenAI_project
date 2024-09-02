import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
    default: false,
  })
  name!: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    default: false,
  })
  pw!: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    default: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
    default: false,
  })
  intro!: string;
}
