export default interface ICreateTransactionDTO {
  company_Id: string;
  description: string;
  trasactionType: string;
  value: number;
  type: 'CREDIT' | 'DEBIT';
  endOfCard?: string;
  establishment?: string;
}
