import {
	USUARIO_LISTAR,
	USUARIO_DETALLE,
	USUARIO_REGISTRAR,
	USUARIO_ACTUALIZAR,
	USUARIO_ELIMINAR,
	ANULAR_USUARIO
	
} from './UsuarioTypes';

const UsuarioReducers = (state = {}, action) => {
	switch (action.type) {
		case USUARIO_LISTAR: {
			return {
				...state,
				usuarios: action.usuarios,
			};
		}
		case USUARIO_DETALLE: {
			return {
				...state,
				usuario: action.usuario,
			};
		}
		case USUARIO_REGISTRAR: {
			return {
				...state,
				data: action.data,
			};
		}
		case USUARIO_ACTUALIZAR: {
			return {
				...state,
				data: action.data,
			};
		}
		case USUARIO_ELIMINAR: {
			return {
				...state,
				data: action.data,
			};
		}		
		case ANULAR_USUARIO: {
			return {
				...state,
				data: action.data,
			};
		}
		default: {
			return state;
		}
	}
};

export default UsuarioReducers;