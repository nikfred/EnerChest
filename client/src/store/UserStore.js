import {makeAutoObservable} from "mobx";

export default class  UserStore{
    constructor() {
        this._isAdmin = false
        this._isAuth = false
        this._totalPrice = 0
        this._user = {}
        this._rating = 0
        this._isSelectedRating = false
        makeAutoObservable(this)
    }

    setIsAdmin(bool){
        this._isAdmin = bool
    }

    setIsAuth(bool){
        this._isAuth = bool
    }

    setTotalPrice(total){
        this._totalPrice = total
    }

    setUser(user){
        this._user = user
    }

    setRating(rating){
        this._rating = rating
    }

    setIsSelectedRating(bool){
        this._isSelectedRating = bool
    }

    get isAdmin(){
        return this._isAdmin
    }

    get isAuth(){
        return this._isAuth
    }

    get totalPrice(){
        return this._totalPrice
    }

    get user(){
        return this._user
    }

    get rating(){
        return this._rating
    }

    get isSelectedRating(){
        return this._isSelectedRating
    }
}