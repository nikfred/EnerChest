import {makeAutoObservable} from "mobx";

export default class  ProductStore{
    constructor() {
        this._brands = [
            {id: 1, name: 'NonStop'},
            {id: 1, name: 'Hruchevo'}
        ]
        this._size = [
            {id: 1, name: "0.25"},
            {id: 1, name: "0.50"}
        ]

        makeAutoObservable(this)
    }

    setBrands(brands){
        this._brands = brands
    }

    setSize(size){
        this._size = size
    }

    get brands(){
        return this._brands
    }

    get size(){
        return this._size
    }
}