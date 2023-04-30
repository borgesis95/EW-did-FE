export interface TransactionDto {
  address?: string;
  quantity: number;
  price: number;
  date: Date;
}

export interface MarketDto {
  address?: string;
  price: number;
  date: string;
}
