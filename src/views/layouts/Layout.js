import Admin from './Admin';
import Auth from './Auth';
import useAuth from '../../hooks/auth/useAuth';
import Preloader from './partials/Preloader';

const Layout = () => {
	const auth = useAuth();
	return (
		<>
			{auth ? <Admin /> : <Auth />}
		</>
	);
};

export default Layout;