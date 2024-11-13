import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget-dto';
import { JwtAuthGuard } from 'src/core/guard/jwt-auth.guard';

@Controller('budgets')
export class BudgetsController {
    constructor(private budgetsService: BudgetsService){}

    @UseGuards(JwtAuthGuard)
    @Post('add')
    addNewBudgetController(
        @Body() createBudgetDto: CreateBudgetDto,
        @Request() req,
    ) {
        createBudgetDto.user_id = req.user.id;
        return this.budgetsService.createBudget(createBudgetDto)
    }


    @UseGuards(JwtAuthGuard)
    @Get('get')
    getBudgetsController(
        @Request() req,
    ) {
        return this.budgetsService.getBudgets(req.user.id)
    }
}
