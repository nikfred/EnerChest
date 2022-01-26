import {makeAutoObservable} from "mobx";

export default class  ProductStore{
    constructor() {
        this._brands = [ ]
        this._sizes = [ ]
        this._products = [ ]
        this._selectedBrand = {}
        this._selectedSize = {}
        this._selectedDispenser = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 8

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
        this.setPage(1)
        this._selectedBrand = brand
    }

    setSelectedSize(size){
        this.setPage(1)
        this._selectedSize = size
    }

    setSelectedDispenser(dispenser){
        this._selectedDispenser = dispenser
    }

    setPage(page){
        this._page = page
    }
    setTotalCount(count){
        this._totalCount = count
    }
    setLimit(limit) {
        this._limit = limit
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

    get selectedDispenser(){
        return this._selectedDispenser
    }

    get page(){
        return this._page
    }

    get totalCount(){
        return this._totalCount
    }

    get limit(){
        return this._limit
    }
}