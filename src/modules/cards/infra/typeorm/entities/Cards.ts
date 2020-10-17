import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Company from '@modules/company/infra/typeorm/entities/Company';

@Entity('cards')
class Cards {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_Id: string;

  @OneToOne(() => Company, company => company.cards, { eager: true })
  @JoinColumn({ name: 'company_Id' })
  company: Company;

  @Column()
  cardNumber: string;

  @Column()
  cardName: string;

  @Column()
  agencyNumber: string;

  @Column()
  ccv: number;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default Cards;
