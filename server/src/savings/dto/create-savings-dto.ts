import { IsString, IsNumber,  IsNotEmpty } from 'class-validator';

export class CreateSavingsDTO {
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  goal: number;

  @IsNumber()
  @IsString()
  wallet_id: number;

  @IsNumber()
  @IsString()
  user_id?: number;
  
}
