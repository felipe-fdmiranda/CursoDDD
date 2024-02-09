export class Address {

    _street: string;
    _number: number;
    _zipCode: string;
    _state: string;

    constructor(street: string, number: number, zipCode: string, state: string) {
        this._street = street;
        this._number = number;
        this._zipCode = zipCode;
        this._state = state;
        this.validate();
    }

    validate() {
        if (this._street.length === 0) {
            throw new Error("Street is required");
        }
        if (this._number <= 0) {
            throw new Error("Number is required");
        }
        if (this._zipCode.length === 0) {
            throw new Error("ZipCode is required");
        }
        if (this._state.length === 0) {
            throw new Error("State is required");
        }
    }

    get street() {
        return this._street;
    }

    get number() {
        return this._number;
    }

    get zipCode() {
        return this._zipCode;
    }

    get city() {
        return this._state;
    }

    toString() {
        return `${this._street}, ${this._number} - ${this._zipCode} - ${this._state}`;
    }
}
