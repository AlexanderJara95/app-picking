import { Routes, Route } from 'react-router-dom';
import { PrivateOutlet, PublicOutlet } from './CheckPageNavigation';

//Publicas
import Login from '../views/auth/Login';
import PasswordReset from '../views/auth/PasswordReset';
import SendResetLink from '../views/auth/SendResetLink';
//Privados
import HomeIndex from '../views/home/HomeIndex';
import UsuarioIndex from '../views/usuario/UsuarioIndex';
import OrdenVentaIndex from '../views/ordenVenta/OrdenVentaIndex';
import InformeIndex from '../views/Informe/InformeIndex';

const RouterView = () => (
	<Routes>
		<Route path='/login' element={<PublicOutlet />}>
			<Route path='' element={<Login />} />
		</Route>
		<Route path='/sendresetlink' element={<PublicOutlet />}>
			<Route path='' element={<SendResetLink />} />
		</Route>
		<Route path='/passwordreset' element={<PublicOutlet />}>
			<Route path='' element={<PasswordReset />} />
		</Route>
		<Route path='/' element={<PrivateOutlet />}>
			<Route path='' element={<HomeIndex />} />
		</Route>
		{/*<Route path='/usuarios' element={<PrivateOutlet />}>
			<Route path='' element={<UsuarioIndex />} />
		</Route>*/}
		<Route path='/orden' element={<PrivateOutlet />}>
			<Route path='' element={<OrdenVentaIndex />} />
		</Route>
		<Route path='/importar' element={<PrivateOutlet />}>
			<Route path='' element={<InformeIndex />} />
		</Route>
    </Routes>
);

export default RouterView;