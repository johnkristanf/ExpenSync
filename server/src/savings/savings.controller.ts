import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { SavingsService } from './savings.service';
import { JwtAuthGuard } from 'src/core/guard/jwt-auth.guard';
import { CreateSavingsDTO } from './dto/create-savings-dto';

@Controller('savings')
export class SavingsController {
  constructor(private readonly savingsService: SavingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async createSavingsController(
    @Body() savingsDTO: CreateSavingsDTO,
    @Request() req,
  ){

    if(req.user.id) savingsDTO.user_id = req.user.id
    return await this.savingsService.createSavings(savingsDTO);
  }
}
