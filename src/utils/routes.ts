import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseCookies } from 'nookies';

interface ProtectedRouteProps {
    children: ReactNode;
}

const isAuthenticated = (): boolean => {
    const cookies = parseCookies()
    const token = cookies["@barber.token"]

    return !!token;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/');
        }
    })
    return children;
};

export default ProtectedRoute;