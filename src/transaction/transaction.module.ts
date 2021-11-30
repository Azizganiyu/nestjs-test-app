import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { PaymentService } from 'src/services/payment/payment.service';
import { HttpModule } from '@nestjs/axios';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Product]), HttpModule],
  controllers: [TransactionController],
  providers: [TransactionService, PaymentService, ProductService]
})
export class TransactionModule {}
