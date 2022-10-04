import Admin from './Admin';
import Auth from './Auth';
import useAuth from '../../hooks/auth/useAuth';
import Preloader from './partials/Preloader';
import { obtenerAutorizacion } from '../../config/LocalStorageService';

const Layout = () => {
	const auth = useAuth();
	if(auth) {
		let data = obtenerAutorizacion();
    	window.usuario = data;
    	//console.log("window.user",window.usuario);
	}
	return (
		<>
			{auth ? <Admin /> : <Auth />}

		</>
	);
};

export default Layout;