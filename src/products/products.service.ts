import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity'
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ){}
  private products: CreateProductDto[] = [
  ];
   create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto)
    return product;
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({
      productId: id,
    })
    if (!product) throw new NotFoundException()
    return product;
  }

  findByProvider(id: string){
    const productFound = this.products.filter((product)=>product.provider === id);
    if (productFound.length == 0) throw new NotFoundException()
    return productFound;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
   const productToUpdate = await this.productRepository.preload({
    productId: id,
    ...updateProductDto
   })
   if (!productToUpdate) throw new NotFoundException()
   this.productRepository.save(productToUpdate);
   return productToUpdate;
  }

  remove(id: string) {
    return this.productRepository.delete({
      productId: id,
    })
  }
}
