import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {

  constructor(@InjectRepository(Transaction) private transactionRepository: Repository<Transaction>){}

  create(data: Transaction)  : Promise<Transaction>  {
    const transaction = this.transactionRepository.create(data);
    return this.transactionRepository.save(transaction);
  }

  findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async findOne(id: number) : Promise<Transaction>  {
    try {
      const transaction = await this.transactionRepository.findOneOrFail(id);
      return transaction;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) : Promise<Transaction>  {
    const transaction = await this.findOne(id);

    const updated = {
      ...transaction,
      ...updateTransactionDto,
      status: 1,
    };

    return this.transactionRepository.save(updated);
  }

  async remove(id: number) : Promise<Transaction>  {
    const transaction = await this.findOne(id);

    return this.transactionRepository.remove(transaction);
  }
}
