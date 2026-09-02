import {
    ProductCollection,
    ProductShoeSize,
    ProductSize,
    ProductStatus,
} from "../enums/product.enum";

export interface Product {
    _id: string;
    productStatus: ProductStatus;
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productDiscountPrice?: number;
    productStock: number;
    productSizes: Array<ProductSize | ProductShoeSize>;
    productColors: string[];
    productBrand?: string;
    productMaterial?: string;
    productDesc?: string;
    productImages: string[];
    productViews: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductInquiry {
    order?: "asc" | "desc";
    page: number;
    limit: number;
    productCollection?: ProductCollection;
    productStatus?: ProductStatus;
    size?: ProductSize | ProductShoeSize;
    color?: string;
    search?: string;
}
