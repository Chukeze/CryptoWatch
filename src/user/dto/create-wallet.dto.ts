export class CreateWalletDto {
  id: string
  name: string;
  userId: string;
  amount: number; 
  note?: string;
}