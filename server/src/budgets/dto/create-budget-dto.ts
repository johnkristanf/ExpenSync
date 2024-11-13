import { IsString, IsNumber, IsOptional, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateBudgetDto {
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

  @IsNumber()
  @IsString()
  user_id?: number;


  @IsOptional()
  @IsDateString()
  created_at?: Date;

  @IsOptional()
  @IsDateString()
  update_at?: Date;
}
