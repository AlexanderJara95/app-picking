import { Navigate, Outlet } from 'react-router-dom';
//import useAuth from '../hooks/auth/useAuth';

export const PrivateOutlet = () => {
	//const auth = useAuth();
    console.log("No logueado privado");
	const auth = false;

	return auth ? <Outlet /> : <Navigate to='/login' />;
};

export const PublicOutlet = () => {
	//const auth = useAuth();
    console.log("No logueado publico");
	const auth = false;
	return !auth ? <Outlet /> : <Navigate to='/' />;
};