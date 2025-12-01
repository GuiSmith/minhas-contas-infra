// Users
import Register from '@pages/user/Register';
import Login from '@pages/user/Login';
import Logout from '@pages/user/Logout';

// Bills
import BillForm from '@pages/bill/BillForm';

const routes = [
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/logout', element: <Logout />},
    { path: '/bill/form', element: <BillForm /> },
    { path: '/bill/form/:id', element: <BillForm /> },
];

export default routes;