import {makeAutoObservable} from "mobx";

export default class  ProductStore{
    constructor() {
        this._brands = [
            {id: 1, name: 'NonStop'},
            {id: 2, name: 'Hruchevo'},
            {id: 3, name: 'Hell'},
            {id: 4, name: 'Pit Bull'},
            {id: 5, name: 'Monster'},
            {id: 6, name: 'Gorila'}
        ]
        this._sizes = [
            {id: 1, name: "0.25"},
            {id: 4, name: "0.50"}
        ]
        this._selectedBrand = {}
        this._selectedSize = {}

        makeAutoObservable(this)
    }

    setBrands(brands){
        this._brands = brands
    }

    setSizes(sizes){
        this._size = sizes
    }

    setSelectedBrand(brand){
        this._selectedBrand = brand
    }
    setSelectedSize(size){
        this._selectedBrand = size
    }

    get brands(){
        return this._brands
    }

    get sizes(){
        return this._sizes
    }

    get selectedBrand(){
        return this._selectedBrand
    }

    get selectedSize(){
        return this._selectedSize
    }
}