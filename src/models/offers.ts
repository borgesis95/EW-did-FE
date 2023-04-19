export interface Offers {
  asset: string;
  price: string;
  startDate: string;
  endDate: string;
}

export interface OfferDto {
  address: string;
  price: string;
  date: string | number;
  active: boolean;
}
