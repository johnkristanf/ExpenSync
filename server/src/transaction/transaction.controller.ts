import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from 'src/core/guard/jwt-auth.guard';
import { CreateTransactionDto } from './dto/create-transaction-dto';

@Controller('transaction')
export class TransactionController {
    constructor(
        private transactionService: TransactionService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post('add')
    createTransactionController(
        @Request() req, 
        @Body() createTransactionDTO: CreateTransactionDto
    ){
        createTransactionDTO.user_id =  createTransactionDTO.user_id ?? req.user.id;
        return this.transactionService.createTransaction(createTransactionDTO);
    }
}
