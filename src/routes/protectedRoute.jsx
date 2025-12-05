import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';

export default function ProtectedRoute({ element, auth }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (auth !== null && auth !== isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    return element;
}