export default interface IListAllTransactionsFilteringByDateAndTypeDTO {
  company_Id: string;
  date: Date;
  type: 'CREDIT' | 'DEBIT';
}
