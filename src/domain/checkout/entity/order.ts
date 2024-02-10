import OrderItem from "./order_item";

export class Order {

    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];
    private _total: number;

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    constructor(id: string, costumerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = costumerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    validate(): boolean {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._customerId.length === 0) {
            throw new Error("CustomerId is required");
        }
        if (this._items.length === 0) {
            throw new Error("Items are required");
        }
        if (this._items.some(item => item.quantity <= 0) ) {
            throw new Error("Quantity must be greater than 0");
        }

        return true;
    }

    total() {
        return this._items.reduce((total, item) => total + item.price, 0);
    }
}
