import {Order} from "./order";
import OrderItem from "./order_item";

describe('Order unit tests', () => {

    it('should throw error when id is empty', () => {
        expect(() => {
            new Order("", "1", []);
        }).toThrow(new Error("Id is required"));
    });

    it('should throw error when customerId is empty', () => {
        expect(() => {
            new Order("123", "", []);
        }).toThrow(new Error("CustomerId is required"));
    });

    it('should throw error when items is empty', () => {
        expect(() => {
            new Order("123", "123", []);
        }).toThrow(new Error("Items are required"));
    });

    it('should calculate total', () => {
        const item1 = new OrderItem("1", "Item 1", 100, 'p1', 2);
        const item2 = new OrderItem("1", "Item 1", 200, 'p2', 2);

        const order1 = new Order("123", "123", [item1]);
        expect(order1.total()).toBe(200);

        const order2 = new Order("123", "123", [item1, item2]);
        expect(order2.total()).toBe(600);
    });

    it('should throw error if the item qte is less or equal zero', () => {
        expect(() => {
            const item1 = new OrderItem("1", "Item 1", 100, 'p1', 0);
            const order1 = new Order("123", "123", [item1]);
        }).toThrow(new Error("Quantity must be greater than 0"));
    });

});
