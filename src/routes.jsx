// Usuários
import Register from '@pages/user/Register';
import Login from '@pages/user/Login';
import Logout from '@pages/user/Logout';

const routes = [
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/logout', element: <Logout />},
];

export default routes;