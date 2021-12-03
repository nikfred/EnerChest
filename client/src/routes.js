import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, ACCOUNT_ROUTE} from "./utils/consts";
import AdminPanel from "./pages/AdminPanel";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Product from "./pages/Product";
import Account from "./pages/Account";

export const authRoutes = [
    {
        path : BASKET_ROUTE,
        Component: Basket
    },
    {
        path : ACCOUNT_ROUTE,
        Component: Account
    }

]

export const adminRoutes = [
    {
        path : ADMIN_ROUTE,
        Component: AdminPanel
    }
]

export const guestRoutes = [
    {
        path : LOGIN_ROUTE,
        Component: Auth
    },
    {
        path : REGISTRATION_ROUTE,
        Component: Auth
    }
]

export const publicRoutes = [
    {
        path : SHOP_ROUTE,
        Component: Shop
    },
    {
        path : PRODUCT_ROUTE + '/:id',
        Component: Product
    }
]