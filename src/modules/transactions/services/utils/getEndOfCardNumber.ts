import { ca } from 'date-fns/locale';

export default function getEndOfCardeNumber(cardNumber: string): string {
  const splitCardNamber = cardNumber.split(' ');
  return splitCardNamber[splitCardNamber.length - 1];
}
