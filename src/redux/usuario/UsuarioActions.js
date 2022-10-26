import axios from 'axios';
import {
	USUARIO_LISTAR,
	USUARIO_LISTAR_ID,
	USUARIO_DETALLE,
	USUARIO_VALIDAR_REGISTRAR,
	USUARIO_REGISTRAR,
	USUARIO_ACTUALIZAR,
	USUARIO_ELIMINAR,
	ANULAR_USUARIO,
	LISTAR_USUARIO_ID
} from './UsuarioTypes';
import { API_BASE_URL } from '../../config/Services';

export const validarregistrarUsuario =(paramData)=>async dispatch=>{
	var formData = new FormData();	
    formData.append("username", paramData.username);
	const response = await axios.post(`${API_BASE_URL}/serviciovalidarregistrarusuario.php`,formData);
	return dispatch({
		type: USUARIO_REGISTRAR,
		status: response.status,
		data: response.data,
	})
}

export const registrarUsuario = (paramData) => async dispatch => {
	var formData = new FormData();	
	//console.log("correo:",(paramData.correo).split("@")[0]);
    formData.append("nombre", paramData.nombres);
	formData.append("apellido", paramData.apellidos);
    formData.append("correo", paramData.username+"@megalabs.com.pe");
    formData.append("username", paramData.username);
	formData.append("password", paramData.password);
	formData.append("nivelUsuario", paramData.nivelUsuario);
	const response = await axios.post(`${API_BASE_URL}/servicioregistrarusuario.php`,formData);
	return dispatch({
		type: USUARIO_REGISTRAR,
		status: response.status,
		data: response.data,
	})
}

export const listarUsuarios = () => async dispatch => {
	const response = await axios.get(`${API_BASE_URL}/serviciolistarusuarios.php`);
	return dispatch({
		type: USUARIO_LISTAR,
		status: response.status,
		usuarios: response.data,
	})
}

export const anularUsuario = (paramData) => async dispatch => {
	//console.log("Param Actu",paramData);
	var formData = new FormData();
    formData.append("idUsuario", paramData.idUsuario);
    formData.append("estado", paramData.estado);
    
	const response = await axios.post(`${API_BASE_URL}/servicioanularusuario.php`,formData);
    //console.log("Actualizado",response.data);
    return dispatch({
        type: ANULAR_USUARIO,
        status: response.status,
        data: response.data
    })  
}  

/*  LISTAR USUARIO POR ID */
export const listarUsuarioPorId = (idUsuario) => async dispatch => {
	var formData = new FormData();
    formData.append("idUsuario", idUsuario);
    const response = await axios.post(`${API_BASE_URL}/servicioconsultarusuario.php`,formData);
    return dispatch({
        type: USUARIO_DETALLE,
		status: response.status,
        detalleUsuario: response.data
    })
}

export const actualizarUsuario = (paramData) => async dispatch => {
	var formData = new FormData();	
	console.log("formData",paramData);
    formData.append("idUsuario", paramData.idUsuario);
    formData.append("nombre", paramData.nombre);
	formData.append("apellido", paramData.apellido);
    formData.append("correo", paramData.username+"@megalabs.com.pe");
    formData.append("username", paramData.username);
	formData.append("password", paramData.password);
	formData.append("nivelUsuario", paramData.nivelUsuario);
	const response = await axios.post(`${API_BASE_URL}/servicioactualizarusuario.php`,formData);
	return dispatch({
		type: USUARIO_ACTUALIZAR,
		status: response.status,
		data: response.data
	})
}

/*export const detalleUsuario = id => async dispatch => {
	const response = await axios.get(
		`${API_BASE_URL}/api/auth/usuario/obtener/${id}`,
	)

	return dispatch({
		type: USUARIO_DETALLE,
		usuario: response.data,
	})
}

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
};*/