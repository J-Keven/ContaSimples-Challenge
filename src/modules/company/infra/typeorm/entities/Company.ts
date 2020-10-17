import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinTable,
  OneToMany,
} from 'typeorm';

import Cards from '@modules/cards/infra/typeorm/entities/Cards';
import BankAccount from './BankAccount';

@Entity('company')
class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => BankAccount, bankAccount => bankAccount.company)
  bankAccount: BankAccount;

  @OneToMany(() => Cards, card => card.company)
  cards: Cards[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default Company;
