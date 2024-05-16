import About from "../Components/About";
import Home from "../Components/Home";
import MainFood from "../Components/MainFood";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import ManageBookPage from "../pages/Admin/ManageBook";
import ManageBorrowRequestPage from "../pages/Admin/ManageBookRequest";
import ManageUserPage from "../pages/Admin/ManageUser";
import Cart from "../pages/Cart";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register"

export const adminRoutes = [
    {
        path: '/admin/books', component: ManageBookPage, layout: AdminLayout,
    },
    {
        path: '/admin/users', component: ManageUserPage, layout: AdminLayout
    },
    {
        path: '/admin/borrow-requests', component: ManageBorrowRequestPage, layout: AdminLayout
    },
]

export const customerRoutes = [
    {
        path: "/Register", component: Register, layout: UserLayout
    },
    {
        path: "/Login", component: Login, layout: UserLayout
    },
    {
        path: "/", component: Home, layout: UserLayout
    },
    {
        path: "/OurBook", component: MainFood, layout: UserLayout
    },
    {
        path: "/About", component: About, layout: UserLayout
    },

    {
        path: "/carts", component: Cart, layout: UserLayout
    },




]