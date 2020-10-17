export default interface IFindAllInMonthFromCompanyDTO {
  company_Id: string;
  month: number;
  year: number;
  type: 'CREDIT' | 'DEBIT';
}
