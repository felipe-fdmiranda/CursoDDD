import {Sequelize} from "sequelize-typescript";
import OrderModel from "./order.model";
import CustomerModel from "../../../customer/repository/sequilize/customer.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequilize/product.model";
import Customer from "../../../../domain/customer/entity/custumer";
import {Address} from "../../../../domain/customer/value-object/address";
import ProductRepository from "../../../product/repository/sequilize/product.repository";
import CustomerRepository from "../../../customer/repository/sequilize/customer.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import {Order} from "../../../../domain/checkout/entity/order";
import OrderRepository from "./order.repository";

describe('Order Repository unit tests', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a new order', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('123', 'Customer 1');
        const address = new Address('Street 1', 123, 'Zipcode 1', 'City 1');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product('1', 'Product 1', 100);
        await productRepository.create(product);

        const orderItem = new OrderItem('1', product.name, product.price, product.id, 2);

        const order = new Order('1', customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({where: {id: '1'}, include: ["items"]});

        expect(orderModel.toJSON()).toStrictEqual({
            id: '1',
            customer_id: '123',
            total: 200,
            items: [
                {
                    id: '1',
                    name: 'Product 1',
                    price: 200,
                    product_id: '1',
                    quantity: 2,
                    order_id: '1'
                }
            ]
        });

    });

});
