import { 
	CONSULTAR_ORDEN_POR_PV,
	LISTAR_ORDEN,
	LISTAR_ORDEN_DETALLE,
	REGISTRAR_ORDEN,
	REGISTRAR_ORDEN_DETALLE,
	MODIFICAR_ORDEN
} from './OrdenVentaTypes';

const OrdenVentaReducer = (state = {}, action) => {
	switch (action.type) {
		case CONSULTAR_ORDEN_POR_PV: {
			return {
				...state,
				listarOrden: action.listarOrden,
			};
		}
		case LISTAR_ORDEN: {
			return {
				...state,
				listarOrden: action.listarOrden,
			};
		}
		case LISTAR_ORDEN_DETALLE: {
			return {
				...state,
				listarOrden: action.listarOrden,
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
		case REGISTRAR_ORDEN_DETALLE: {
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
