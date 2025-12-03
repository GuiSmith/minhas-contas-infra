// Users
import Register from '@pages/user/Register';
import Login from '@pages/user/Login';
import Logout from '@pages/user/Logout';

// Bills
import BillForm from '@pages/bill/BillForm';

// Category
import CategoryForm from '@pages/category/CategoryForm';

const routes = [
    // Users
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/logout', element: <Logout />},
    // Bills
    { path: '/bill/form', element: <BillForm /> },
    { path: '/bill/form/:id', element: <BillForm /> },
    // Category
    { path: 'category/form', element: <CategoryForm /> },
    { path: 'category/form/:id', element: <CategoryForm /> },
];

export default routes;