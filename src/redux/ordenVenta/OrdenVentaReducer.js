import { 
	CONSULTAR_ORDEN_POR_PV,
	LISTAR_ORDEN_POR_PV,
	REGISTRAR_ORDEN,
	MODIFICAR_ORDEN
} from './OrdenVentaTypes';

const OrdenVentaReducer = (state = {}, action) => {
	switch (action.type) {
		case CONSULTAR_ORDEN_POR_PV: {
			return {
				...state,
				usuario: action.usuario,
			};
		}
		case LISTAR_ORDEN_POR_PV: {
			return {
				...state,
				usuario: action.usuario,
			};
		}
		case REGISTRAR_ORDEN: {
			return {
				...state,
				data: action.data,
			};
		}
		case MODIFICAR_ORDEN: {
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

export default OrdenVentaReducer;
