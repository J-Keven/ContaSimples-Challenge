import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatBankAccaountTable1602692890347
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bankAccount',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'company_Id',
            type: 'uuid',
          },
          {
            name: 'BankNumber',
            type: 'integer',
            // default: 999,
          },
          {
            name: 'bankName',
            type: 'varchar',
            // default: 'CONTA SIMPLES',
          },
          {
            name: 'agencyNumber',
            type: 'integer',
            // default: 1,
          },
          {
            name: 'accountNumber',
            type: 'varchar',
            // isUnique: true,
          },
          {
            name: 'accountDigit',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'ForeingKeyCompany',
            columnNames: ['company_Id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'company',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bankAccount');
  }
}
