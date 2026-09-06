import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";
import { ProductCollection, ProductShoeSize, ProductSize, ProductStatus } from "../../lib/enums/product.enum";

interface ApiProduct {
  _id: string;
  productStatus: ProductStatus;
  productCollection: ProductCollection;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSize?: ProductSize;
  productShoeSize?: ProductShoeSize;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
  createdAt: string;
  updatedAt: string;
}

const imageUrl = (image: string): string => {
  if (/^(https?:)?\/\//.test(image) || image.startsWith("data:")) return image;
  return `${serverApi}/${image.replace(/^\//, "")}`;
};

const normalizeProduct = (product: ApiProduct): Product => {
  const size = product.productCollection === ProductCollection.SHOES
    ? product.productShoeSize
    : product.productSize;

  return {
    _id: product._id,
    productStatus: product.productStatus,
    productCollection: product.productCollection,
    productName: product.productName,
    productPrice: product.productPrice,
    productStock: product.productLeftCount,
    productSizes: size ? [size] : [],
    productColors: [],
    productDesc: product.productDesc,
    productImages: (product.productImages ?? []).map(imageUrl),
    productViews: product.productViews ?? 0,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt),
  };
};

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = `${serverApi}/product`;
  }

  public async getProducts(input: ProductInquiry): Promise<Product[]> {
    const params = new URLSearchParams({
      page: String(input.page),
      limit: String(input.limit),
    });

    if (input.order) params.set("order", input.order);
    if (input.sort) params.set("sort", input.sort);
    if (input.productCollection) {
      params.set("productCollection", input.productCollection);
    }
    if (input.productStatus) params.set("productStatus", input.productStatus);
    if (input.size) params.set("size", input.size);
    if (input.color) params.set("color", input.color);
    if (input.search) params.set("search", input.search);

    const result = await axios.get<ApiProduct[]>(`${this.path}/all?${params.toString()}`);
    return result.data.map(normalizeProduct);
  }

  public async getProduct(productId: string): Promise<Product> {
    const result = await axios.get<ApiProduct>(`${this.path}/${productId}`);
    return normalizeProduct(result.data);
  }
}

export default ProductService;
