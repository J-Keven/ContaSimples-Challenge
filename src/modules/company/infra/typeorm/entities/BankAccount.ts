import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Company from './Company';

@Entity('bankAccount')
class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_Id: string;

  @OneToOne(() => Company, company => company.bankAccount)
  @JoinColumn({ name: 'company_Id' })
  company: Company;

  @Column()
  BankNumber: number;

  @Column()
  bankName: string;

  @Column()
  agencyNumber: number;

  @Column()
  accountNumber: string;

  @Column()
  accountDigit: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default BankAccount;
