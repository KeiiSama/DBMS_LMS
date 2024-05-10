import AdminLayout from "../layouts/AdminLayout";
import ManageBookPage from "../pages/Admin/ManageBook";
import ManageBorrowRequestPage from "../pages/Admin/ManageBookRequest";
import ManageUserPage from "../pages/Admin/ManageUser";
import Cart from "../pages/Cart";

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
        path: "/carts", component: Cart, layout: null
    }
]