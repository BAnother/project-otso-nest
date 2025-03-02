import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "src/products/entities/product.entity";
@Entity()
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    providerId: string;
    @Column('text')
    providerName: string;
    @Column('text')
    phoneEmail: string;
    @Column({
        type: "text",
        nullable: true,
    })
    providerPhoneNumber: string;
    @OneToMany(() => Product, (photo) => photo.provider)
    products: Product[];
}
