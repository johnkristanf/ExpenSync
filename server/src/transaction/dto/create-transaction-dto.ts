import { IsString, IsNumber, IsNotEmpty, } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

}
