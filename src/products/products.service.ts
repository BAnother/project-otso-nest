import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: 'Cacahuate',
      price: 10,
      countSeal: 2,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: 'Pepsi 600ml',
      price: 20,
      countSeal: 3,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: 'Vualá',
      price: 20,
      countSeal: 3,
      provider: uuid(),
    },
  ];
  create(createProductDto: CreateProductDto) {
    createProductDto.productId = uuid();
    this.products.push(createProductDto)
    return createProductDto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const productFound = this.products.filter((product)=>product.productId === id)[0]
    if(!productFound) throw new NotImplementedException()
      return productFound;
  }

  findByProvider(id: string){
    const productFound = this.products.filter((product)=>product.provider === id);
    if (productFound.length == 0) throw new NotImplementedException()
    return productFound;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let product = this.findOne(id)
    product = {
      ...product,
      ...updateProductDto,
    }
    return product;
  }

  remove(id: string) {
    const { productId } = this.findOne(id)
    this.products = this.products.filter((product) => product.productId !== productId);
    return this.products
  }
}
