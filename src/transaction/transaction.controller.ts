import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Transaction } from './entities/transaction.entity';
import { PaymentService } from 'src/services/payment/payment.service';
import { ProductService } from 'src/product/product.service';

@ApiTags('Transactions')
@Controller('payment')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private paymentService: PaymentService,
    private productService: ProductService
    ) {}

  @ApiCreatedResponse({type: Transaction})
  @Post('create')
  async create(@Body() createTransactionDto: CreateTransactionDto) : Promise<Transaction>  {

    const amount = Number((await this.productService.findOne(createTransactionDto.product_id)).price);

    let result =  await this.paymentService.initializePayment(amount);
    if(!result.data.status){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Unable to generate a payment link',
      }, HttpStatus.BAD_REQUEST);
    }


    const data = {
      status: 0,
      amount: amount,
      reference: result.data.data.reference,
      payment_url: result.data.data.authorization_url,
      ...createTransactionDto
    };

    return this.transactionService.create(data);
  }

  @ApiOkResponse({type: Transaction, isArray: true})
  @Get()
  findAll() : Promise<Transaction[]>  {
    return this.transactionService.findAll();
  }

  @ApiOkResponse({type: Transaction})
  @Get(':id')
  findOne(@Param('id') id: string) : Promise<Transaction>  {
    return this.transactionService.findOne(+id);
  }

  @ApiOkResponse({type: Transaction})
  @Patch('verify/:id')
  async update(@Param('id', new ParseIntPipe()) id: number, @Body() updateTransactionDto: UpdateTransactionDto) : Promise<Transaction>  {

    const reference = (await this.transactionService.findOne(id)).reference;

    let result =  await this.paymentService.verifyPayment(reference);

    if(!result.data.data.paidAt){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Payment not completed',
      }, HttpStatus.BAD_REQUEST);
    }


    return this.transactionService.update(+id, updateTransactionDto);
  }

  @ApiOkResponse({type: Transaction})
  @Delete(':id')
  remove(@Param('id') id: string) : Promise<Transaction>  {
    return this.transactionService.remove(+id);
  }
}
