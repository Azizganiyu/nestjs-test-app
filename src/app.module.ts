import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TransactionModule } from './transaction/transaction.module';
import { PaymentService } from './services/payment/payment.service';
import ormConfig from '../ORMConfig'
import { HttpModule } from '@nestjs/axios';
import { ProductService } from './product/product.service';
import { Product } from './product/entities/product.entity';
import { Transaction } from './transaction/entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Product]),
    ProductModule, 
    TypeOrmModule.forRoot(ormConfig), 
    TransactionModule, 
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService, PaymentService, ProductService],
})
export class AppModule {}
