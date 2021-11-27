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
            {id: 1, name: "250 ml"},
            {id: 2, name: "500 ml"},
            {id: 3, name: "1 l"},
        ]
        this._products = [
            {id: 1,
                name: "Non ",
                brand: "Hell",
                size: "500 ml",
                price: 22,
                discount: 0,
                description: "",
                imageUrl: "http://20.52.25.145:5000/a0a28597-4d19-4ab3-8f46-a3e7fcf360a1.jpg",
                active: true},
            {id: '6196da412ffd6740ceb2d218',
                name: " Boost",
                brand: "Hell",
                size: "1 l",
                price: 22,
                discount: 0,
                description: "",
                imageUrl: "",
                active: true},
            {id: 3,
                name: "jungle",
                brand: "Hell",
                size: "500 ml",
                price: 22,
                discount: 0,
                description: "",
                imageUrl: "http://20.52.25.145:5000/2fbb2c17-f7b6-40e1-b062-a0d318996ebb.jpg",
                active: true},
            {id: 4,
                name: "oost",
                brand: "Hell",
                size: "250 ml",
                price: 22,
                discount: 0,
                description: "",
                imageUrl: "http://20.52.25.145:5000/a0a28597-4d19-4ab3-8f46-a3e7fcf360a1.jpg",
                active: true},
            {id: 5,
                name: "Nonjungle",
                brand: "Hell",
                size: "250 ml",
                price: 22,
                discount: 0,
                description: "",
                imageUrl: "http://20.52.25.145:5000/0d75648f-3a46-4588-9c4d-9e1d00460c00.png",
                active: true}

        ]
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
        this._brands = products
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