import {makeAutoObservable} from "mobx";

export default class  UserStore{
    constructor() {
        this._isAdmin = true
        this._isAuth = true
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAdmin(bool){
        this._isAdmin = bool
    }

    setIsAuth(bool){
        this._isAuth = bool
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

    get user(){
        return this._user
    }
}