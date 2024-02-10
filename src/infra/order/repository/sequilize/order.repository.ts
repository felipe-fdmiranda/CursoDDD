import OrderModel from "./order.model";
import {Order} from "../../../../domain/checkout/entity/order";
import OrderItemModel from "./order-item.model";

export default class OrderRepository {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity
                })),
            },
            {
                include: [{model: OrderItemModel}],
            }
        );
    }

    /*async update(entity: Order): Promise<void> {
        await OrderModel.update({

        }, {
            where: {id: entity.id}
        });
    }

    async find(id: string): Promise<Order> {
        let customerModel;
        try {
            customerModel = await OrderModel.findOne({
                where: {id},
                rejectOnEmpty: true
            });
        } catch (e) {
            throw new Error(`Order not found`);
        }

        const customer = new Order(id, customerModel.name);
        customer.changeAddress(new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city));
        return customer;
    }

    async findAll(): Promise<Order[]> {
        const customerModels = await OrderModel.findAll();
        return customerModels.map(customerModel => {
            let customer = new Order(customerModel.id, customerModel.name);
            customer.addRewardPoints(customerModel.rewardPoints);
            const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);
            customer.changeAddress(address);
            if (customerModel.active) {
                customer.activate();
            }
            return customer;
        });
    }*/

}
