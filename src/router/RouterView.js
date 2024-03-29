import { Routes, Route} from 'react-router-dom';
import { PrivateOutlet, PublicOutlet } from './CheckPageNavigation';

//Publicas
import Login from '../views/auth/Login';
import PasswordReset from '../views/auth/PasswordReset';
import SendResetLink from '../views/auth/SendResetLink';
//Privados
import HomeIndex from '../views/home/HomeIndex';
import UsuarioIndex from '../views/usuario/UsuarioIndex';
import OrdenVentaIndex from '../views/ordenVenta/OrdenVentaIndex';
import HistorialIndex from '../views/Historial/HistorialIndex';
import InformeIndex from '../views/Informe/InformeIndex';
import DetalleOrdenIndex from '../views/ordenVenta/DetalleOrdenIndex';
import ArticuloIndex from '../views/ordenVenta/ArticuloIndex';
import VerUsuario from '../views/usuario/VerUsuario';
import EditarUsuario from '../views/usuario/EditarUsuario';
import NuevoUsuario from '../views/usuario/NuevoUsuario';


const RouterView = () => {
	const nivel = window.usuario==undefined?'':window.usuario.nivelUsuario;

	return(
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
			{/*<Route path='/usuario' element={<PrivateOutlet />}>
				<Route path='' element={<UsuarioIndex />} />
			</Route>*/}
			<Route path='/orden' element={<PrivateOutlet />}>
				<Route path='' element={<OrdenVentaIndex />} />
			</Route>
			<Route path='/detalleorden/:id' element={<PrivateOutlet />}>
				<Route path='' element={<DetalleOrdenIndex/>} />
			</Route>
			<Route path='/usuario/:id' element={<PrivateOutlet />}>
				<Route path='' element={<VerUsuario/>} />
			</Route>
			<Route path='/usuario/nuevo' element={<PrivateOutlet />}>
				<Route path='' element={<NuevoUsuario/>} />
			</Route>
			<Route path='/usuario/editar/:id' element={<PrivateOutlet />}>
				<Route path='' element={<EditarUsuario/>} />
			</Route>
			
			{nivel??
			(nivel!=2)?
				<Route path='/detallearticulo/:id' element={<PrivateOutlet />}>
					<Route path='' element={<ArticuloIndex/>} />
				</Route>:<Route path='/' element={<PrivateOutlet />}>
				<Route path='' element={<HomeIndex />} />
				</Route>
			}
			
			<Route path="/" element={<PrivateOutlet />}>
				<Route path="/" element={<HomeIndex />} />
				<Route path="/usuario" element={<UsuarioIndex />} />
				<Route path="/historial" element={<HistorialIndex />} />
				{nivel === 1 || nivel === 2 ? (
					<Routes>
						<Route path="/usuario" element={<UsuarioIndex />} />
						<Route path="/historial" element={<HistorialIndex />} />
					</Routes>
				) : null}
			</Route>


			{nivel??
			(nivel!=3)?
				<Route path='/importar' element={<PrivateOutlet />}>
					<Route path='' element={<InformeIndex />} />
				</Route>:<Route path='/' element={<PrivateOutlet />}>
				<Route path='' element={<HomeIndex />} />
				</Route>
			}
		</Routes>
	)
}

export default RouterView;