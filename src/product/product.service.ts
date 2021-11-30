import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

  product: Product[] = [
    {
      id: 1,
      name: 'Rice',
      price: 300,
      description: 'some rice',
      status: 1,
      quantity: 100,
      friendly_url: 'rice',
      image: 'url',
    },
    {
      id: 2,
      name: 'Beans',
      price: 400,
      description: 'some beans',
      status: 1,
      quantity: 50,
      friendly_url: 'rice',
      image: 'url',
    },
  ]


  create(data: Product) {
    this.product.push(data)
    return data;
  }

  findAll(): Product[] {
    return this.product;
  }

  findOne(id: number): Product {
    return this.product[0];
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
