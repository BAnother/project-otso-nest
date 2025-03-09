import { IsOptional,IsUUID, IsString, MaxLength, IsNumber, IsInt, IsObject } from "class-validator";
import { Product } from "../entities/product.entity";
import { Provider } from "src/providers/entities/provider.entity"
export class CreateProductDto extends Product {
    @IsString()
    @IsUUID("4")
    @IsOptional()
    productId: string;
    @IsString()
    @MaxLength(40)
    productName: string;
    @IsNumber()
    price: number;
    @IsInt()
    countSeal: number;
    @IsObject()
    provider: Provider;
}
