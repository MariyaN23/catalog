import { Product } from "@/lib/types/Product";
import { instance } from "@/lib/api/index";

export const productsApi = {
    getProducts() {
        return instance.get<Product[]>('products')
    },
}
