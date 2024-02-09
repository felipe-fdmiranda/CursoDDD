import Product from "./product";
import Customer from "./custumer";

describe('Product unit tests', () => {

    it('should throw error when id is empty', () => {
        expect(() => {
            new Product("", "Product 1", 100);
        }).toThrow(new Error("Id is required"));
    });

    it('should throw error when name is empty', () => {
        expect(() => {
            new Product("1", "", 100);
        }).toThrow(new Error("Name is required"));
    });

    it('should throw error when price is less than zero', () => {
        expect(() => {
            new Product("1", "Product 1", -1);
        }).toThrow(new Error("Price must be greater than zero"));
    });

    it('should change name', () => {
        const product = new Product("123", "Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it('should change price', () => {
        const product = new Product("123", "Product 1", 100);
        product.changePrice(200);
        expect(product.price).toBe(200);
    });

});
