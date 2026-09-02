import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";

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
    if (input.productCollection) {
      params.set("productCollection", input.productCollection);
    }
    if (input.productStatus) params.set("productStatus", input.productStatus);
    if (input.size) params.set("size", input.size);
    if (input.color) params.set("color", input.color);
    if (input.search) params.set("search", input.search);

    const result = await axios.get<Product[]>(`${this.path}/all?${params.toString()}`);
    return result.data;
  }

  public async getProduct(productId: string): Promise<Product> {
    const result = await axios.get<Product>(`${this.path}/${productId}`);
    return result.data;
  }
}

export default ProductService;
