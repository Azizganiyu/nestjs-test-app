import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiCreatedResponse({type: Product})
  @Post()
  create(@Body() createProductDto: CreateProductDto) : Promise<Product> {

    const data = {
      status: createProductDto.status? createProductDto.status : 1,
      image: createProductDto.image? createProductDto.image : '/upload/default.png',
      friendly_url: createProductDto.name.trim().replace(/\s+/g, '-'),
      ...createProductDto
    }

    return this.productService.create(data);

  }

  @ApiOkResponse({type: Product, isArray: true})
  @Get() 
  findAll() : Promise<Product[]> {
    return this.productService.findAll();
  }

  @ApiOkResponse({type: Product})
  @Get(':id')
  findOne(@Param('id') id: string):  Promise<Product> {
    return this.productService.findOne(+id);
  }

  @ApiOkResponse({type: Product})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto):  Promise<Product> {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiOkResponse({type: Product})
  @Delete(':id')
  remove(@Param('id') id: string):  Promise<Product>  {
    return this.productService.remove(+id);
  }
}
