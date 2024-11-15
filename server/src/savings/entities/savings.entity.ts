import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Savings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  amount: number;

  @Column()
  goal: number;

  @Column() 
  wallet_id: number;

  @Column()
  user_id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_at: Date;
}
