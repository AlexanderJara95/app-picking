import axios from 'axios';
import {
	USUARIO_LISTAR,
	USUARIO_DETALLE,
	USUARIO_REGISTRAR,
	USUARIO_ACTUALIZAR,
	USUARIO_ELIMINAR,
} from './UsuarioTypes';
import { API_BASE_URL } from '../../config/Services';

export const listarUsuarios = () => async dispatch => {
	const response = await axios.get(
		`${API_BASE_URL}/serviciolistarusuarios.php`,
	);

	return dispatch({
		type: USUARIO_LISTAR,
		status: response.status,
		usuarios: response.data,
	});
};

export const detalleUsuario = id => async dispatch => {
	const response = await axios.get(
		`${API_BASE_URL}/api/auth/usuario/obtener/${id}`,
	);

	return dispatch({
		type: USUARIO_DETALLE,
		usuario: response.data,
	});
};

export const registrarUsuario = parmaData => async dispatch => {
	const response = await axios.post(
		`${API_BASE_URL}/api/auth/usuario/crearpersonausuario`,
		parmaData,
	);

	return dispatch({
		type: USUARIO_ACTUALIZAR,
		status: response.status,
		data: response.data,
	});
};
export const actualizarUsuario = (parmaData, id) => async dispatch => {
	const response = await axios.put(
		`${API_BASE_URL}/api/auth/usuario/actualizar/${id}`,
		parmaData,
	);

	return dispatch({
		type: USUARIO_ACTUALIZAR,
		status: response.status,
		data: response.data,
	});
};

export const eliminarUsuario = id => async dispatch => {
	const response = await axios.delete(
		`${API_BASE_URL}/api/auth/usuario/eliminar/${id}`,
	);

	return dispatch({
		type: USUARIO_ELIMINAR,
		status: response.status,
		data: response.data,
	});
};