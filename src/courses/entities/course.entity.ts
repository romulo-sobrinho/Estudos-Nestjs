import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tag } from "./tag.entity";

@Entity('courses')
export class Course {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.courses, {
    cascade: true
  })
  tags: Tag[];

  @CreateDateColumn()
  created_at: Date;
 
  @UpdateDateColumn()
  updated_at: Date;
}