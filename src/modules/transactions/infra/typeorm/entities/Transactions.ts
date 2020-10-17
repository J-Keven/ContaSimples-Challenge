import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  IsNull,
} from 'typeorm';
import Company from '@modules/company/infra/typeorm/entities/Company';

@Entity('transactions')
class Transactions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  trasactionType: string;

  @Column()
  value: number;

  @Column()
  type: 'CREDIT' | 'DEBIT';

  @Column()
  endOfCard?: string;

  @Column()
  establishment?: string;

  @Column()
  company_Id: string;

  @ManyToOne(() => Company, company => company.id, { eager: true })
  @JoinColumn({ name: 'company_Id' })
  company: Company;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transactions;
