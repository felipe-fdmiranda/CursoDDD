// EM DDD OS DADOS SEMPRE DEVEM ESTAR CONSISTENTES
// UMA ENTIDADE POR PADRAO ELA TEM QUE SE AUTO VALIDAR

import {Address} from "../value-object/address";

export default class Customer {

    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get rewardPoints() {
        return this._rewardPoints;
    }

    isActive() {
        return this._active;
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    get address() {
        return this._address;
    }
}
