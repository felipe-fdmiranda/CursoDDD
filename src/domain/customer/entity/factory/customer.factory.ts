import Customer from "../custumer";
import {v4 as uuid} from 'uuid';
import {Address} from "../../value-object/address";

export default class CustomerFactory {
    public static create(name: string): Customer {
        return new Customer(uuid(), name);
    }

    public static createWithAddress(name: string, street: string, number: number, zipcode: string, city: string): Customer {
        const customer = new Customer(uuid(), name);
        const address = new Address(street, number, zipcode, city);
        customer.changeAddress(address);
        return customer;
    }
}
