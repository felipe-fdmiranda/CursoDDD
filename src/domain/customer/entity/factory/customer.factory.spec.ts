import CustomerFactory from "./customer.factory";

describe('Customer Factory unit tests', () => {

    it('should create a customer', () => {
        const customer = CustomerFactory.create('Customer 1');
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe('Customer 1');
        expect(customer.address).toBeUndefined();
    });

    it('should create a customer with address', () => {
        const customer = CustomerFactory.createWithAddress('Customer 1', 'Street 1', 123, 'Zipcode 1', 'City 1');
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe('Customer 1');
        expect(customer.address).toBeDefined();
        expect(customer.address.street).toBe('Street 1');
        expect(customer.address.number).toBe(123);
        expect(customer.address.zipCode).toBe('Zipcode 1');
        expect(customer.address.city).toBe('City 1');
    });

});
