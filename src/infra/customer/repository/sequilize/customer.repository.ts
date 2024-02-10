import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository-interface";
import CustomerModel from "./customer.model";
import Customer from "../../../../domain/customer/entity/custumer";
import {Address} from "../../../../domain/customer/value-object/address";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zipCode,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zipCode,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        }, {
            where: {id: entity.id}
        });
    }

    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({
                where: {id},
                rejectOnEmpty: true
            });
        } catch (e) {
            throw new Error(`Customer not found`);
        }

        const customer = new Customer(id, customerModel.name);
        customer.changeAddress(new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city));
        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        return customerModels.map(customerModel => {
            let customer = new Customer(customerModel.id, customerModel.name);
            customer.addRewardPoints(customerModel.rewardPoints);
            const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);
            customer.changeAddress(address);
            if (customerModel.active) {
                customer.activate();
            }
            return customer;
        });
    }

}
