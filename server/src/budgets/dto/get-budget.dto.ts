import { IsString, IsNumber,IsNotEmpty } from 'class-validator';

export class GetBudgetDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsString()
  period: string;

  @IsNotEmpty()
  @IsNumber()
  budget: number;

  @IsNumber()
  @IsString()
  wallet_id: number;


}
