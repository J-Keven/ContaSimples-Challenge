import generateNumber from './generateNumber';

export default function generateAccountNumber(accounts: string[]): string {
  let index = 0;
  let accoutNumber = '';
  while (index !== -1) {
    accoutNumber = generateNumber({ max: 1000000, min: 9999000 }).toString();

    index = accounts.findIndex(account => account === accoutNumber);
  }

  return accoutNumber;
}
