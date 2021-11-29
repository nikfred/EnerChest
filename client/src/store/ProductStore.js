import {makeAutoObservable} from "mobx";

export default class  ProductStore{
    constructor() {
        this._brands = [ ]
        this._sizes = [ ]
        this._products = [ ]
        this._selectedBrand = {}
        this._selectedSize = {}

        makeAutoObservable(this)
    }

    setBrands(brands){
        this._brands = brands
    }

    setSizes(sizes){
        this._sizes = sizes
    }

    setProducts(products){
        this._products = products
    }

    setSelectedBrand(brand){
        this._selectedBrand = brand
    }
    setSelectedSize(size){
        this._selectedSize = size
    }

    get brands(){
        return this._brands
    }

    get sizes(){
        return this._sizes
    }

    get products(){
        return this._products
    }

    get selectedBrand(){
        return this._selectedBrand
    }

    get selectedSize(){
        return this._selectedSize
    }
}