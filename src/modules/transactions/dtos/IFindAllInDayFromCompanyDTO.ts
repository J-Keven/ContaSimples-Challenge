export default interface IFindAllInDayFromCompanyDTO {
  company_Id: string;
  day: number;
  month: number;
  year: number;
  type: 'CREDIT' | 'DEBIT';
}
