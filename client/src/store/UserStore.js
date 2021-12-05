import {makeAutoObservable} from "mobx";

export default class  UserStore{
    constructor() {
        this._isAdmin = false
        this._isAuth = false
        this._totalPrice = 0
        this._user = {}
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
}