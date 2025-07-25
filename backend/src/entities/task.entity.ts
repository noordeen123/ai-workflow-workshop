import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Board } from './board.entity';

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done'
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ 
    type: 'enum', 
    enum: TaskStatus, 
    default: TaskStatus.TODO 
  })
  status: TaskStatus;

  @Column({ default: 0 })
  position: number;

  @Column({ name: 'board_id' })
  boardId: number;

  @ManyToOne(() => Board, board => board.tasks)
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}