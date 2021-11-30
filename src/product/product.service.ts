import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ){}


  create(data: Product): Promise<Product> {
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOneOrFail(id);
      return product;
    } catch (error) {
      throw error
    }

  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    const updated = {
      ...product,
      ...updateProductDto
    };

    return this.productRepository.save(updated);
  }

  async remove(id: number): Promise<Product>  {
    const product = await this.findOne(id);

    return this.productRepository.remove(product);
  }
}
