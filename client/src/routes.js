import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "./utils/consts";
import AdminPanel from "./pages/AdminPanel";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Product from "./pages/Product";

export const authRoutes = [
    {
        path : ADMIN_ROUTE,
        Component: AdminPanel
    },
    {
        path : BASKET_ROUTE,
        Component: Basket
    }

]

export const publicRoutes = [
    {
        path : SHOP_ROUTE,
        Component: Shop
    },
    {
        path : LOGIN_ROUTE,
        Component: Auth
    },
    {
        path : REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path : PRODUCT_ROUTE,
        Component: Product
    }
]