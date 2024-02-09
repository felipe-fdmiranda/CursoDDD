import Product from "../entity/product";

export default class ProductService {

    static incresePrice(products: Product[], percentage: number): Product[] {
        products.forEach((product: any) => {
            product.changePrice(product.price * (1 + percentage / 100));
        });
        return products;
    }

}
