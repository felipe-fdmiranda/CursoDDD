import {Sequelize} from "sequelize-typescript";
import CustomerModel from "./customer.model";
import Customer from "../../../../domain/customer/entity/custumer";
import {Address} from "../../../../domain/customer/value-object/address";
import CustomerRepository from "./customer.repository";

describe('Customer Repository unit tests', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a customer', async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer('1', 'Customer 1');
        const address = new Address('Street 1', 1, '12345', 'City 1');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerCreated = await CustomerModel.findOne({where: {id: '1'}});

        expect(customerCreated.toJSON()).toStrictEqual({
            id: '1',
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zipCode,
            city: address.city
        });

    });

    it('should update a customer', async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer('1', 'Customer 1');
        const address = new Address('Street 1', 1, '12345', 'City 1');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        customer.changeName('Customer 2');
        await customerRepository.update(customer);
        const customerCreated = await CustomerModel.findOne({where: {id: '1'}});

        expect(customerCreated.toJSON()).toStrictEqual({
            id: '1',
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zipCode,
            city: address.city
        });

    });

    it('should find a customer', async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer('1', 'Customer 1');
        const address = new Address('Street 1', 1, '12345', 'City 1');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerFound = await customerRepository.find(customer.id);

        expect(customer).toStrictEqual(customerFound);
    });

    it('should throw an error when customer is not found', async () => {
        const customerRepository = new CustomerRepository();

        await expect(async () => {
            await customerRepository.find('ABC456');
        }).rejects.toThrow('Customer not found');
    });

    it('should find all customers', async () => {
        const customerRepository = new CustomerRepository();

        const customer1 = new Customer('1', 'Customer 1');
        const address1 = new Address('Street 1', 1, '12345', 'City 1');
        customer1.changeAddress(address1);
        customer1.addRewardPoints(10);
        customer1.activate();

        const customer2 = new Customer('2', 'Customer 2');
        const address2 = new Address('Street 2', 2, '12345', 'City 2');
        customer2.changeAddress(address2);
        customer2.addRewardPoints(20);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);
    });

});
