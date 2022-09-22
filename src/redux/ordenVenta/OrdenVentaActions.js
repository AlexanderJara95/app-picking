import axios from 'axios';
import { LISTAR_ORDEN,LISTAR_ORDEN_DETALLE,REGISTRAR_ORDEN,REGISTRAR_ORDEN_DETALLE, 
    LISTAR_ARTICULO_DETALLE, MODIFICAR_ORDEN_DETALLE,REGISTRAR_DETALLE_ARTICULO, ELIMINAR_DETALLE_HIJOS} from './OrdenVentaTypes';
import { API_BASE_URL } from '../../config/Services';

export const listarOrden = () => async dispatch => {
    const response = await axios.get(`${API_BASE_URL}/serviciolistarorden.php`);
    return dispatch({
        type: LISTAR_ORDEN,
		status: response.status,
        listaOrden: response.data==null ? 0:response.data
    })
}
export const registrarOrden = (paramData) => async dispatch => {
	var dateObj = new Date();
    var month = ((dateObj.getMonth() + 1 )<10)?'0'+(dateObj.getMonth() + 1 ):(dateObj.getMonth() + 1 ); //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();
	var formData = new FormData();
    formData.append("idClienteAx", paramData.codCliente);
    formData.append("nombreCliente", paramData.nomCliente);
    formData.append("referencia", paramData.referenciaCliente);
    formData.append("pedidoDeVentas", paramData.pedidoVentas);
    formData.append("fechaSubida", year+'-'+month+'-'+ day);
	formData.append("estado", 1);
	const response = await axios.post(`${API_BASE_URL}/servicioregistrarorden.php`,formData);
    console.log("Registrado",response.data);
    return dispatch({
        type: REGISTRAR_ORDEN,
        status: response.status,
        data: response.data
    })  
}  
export const registrarOrdenDetalle = (paramData) => async dispatch => {
	console.log("Parammmm",paramData);
	var formData = new FormData();
	formData.append("pedidoDeVentas", paramData.pedidoDeVentas);
    formData.append("codigoArticulo", paramData.codigoArticulo);
    formData.append("descripcion", paramData.descripcion);
    formData.append("numeroLote", paramData.numeroLote);	
    formData.append("ubicacion", paramData.ubicacion);
    formData.append("idPallet", paramData.idPallet);
	formData.append("fechaCaducidad", paramData.fechaCaducidad);
    formData.append("cantidad", paramData.cantidad);

	const response = await axios.post(`${API_BASE_URL}/servicioregistrardetalleorden.php`,formData);
    console.log("Registrado",response.data);
    return dispatch({
        type: REGISTRAR_ORDEN_DETALLE,
        status: response.status,
        data: response.data
    })  
}  

export const modificarOrdenDetalle = (paramData) => async dispatch => {
	console.log("Param Actu",paramData);
	var formData = new FormData();
    formData.append("idArticulo", paramData.idArticulo);
	formData.append("listo", paramData.listo);
    
	const response = await axios.post(`${API_BASE_URL}/servicioactualizardetalleorden.php`,formData);
    console.log("Actualizado",response.data);
    return dispatch({
        type: MODIFICAR_ORDEN_DETALLE,
        status: response.status,
        data: response.data
    })  
}  
export const listarOrdenDetallePorId = (id) => async dispatch => {
	var formData = new FormData();
    formData.append("pedidoDeVentas", id);
    const response = await axios.post(`${API_BASE_URL}/servicioconsultardetalleorden.php`,formData);
    return dispatch({
        type: LISTAR_ORDEN_DETALLE,
		status: response.status,
        detalleOrden: response.data
    })
}


/*  NUEVO SERVICIO - MOISES    */
export const listarArticuloPorId = (id) => async dispatch => {
	var formData = new FormData();
    formData.append("idArticulo", id);
    const response = await axios.post(`${API_BASE_URL}/servicioconsultardetallearticulo.php`,formData);
    return dispatch({
        type: LISTAR_ARTICULO_DETALLE,
		status: response.status,
        detalleArticulo: response.data
    })
}

export const registrarDetalleArticulo = (paramData) => async dispatch => {
	console.log("Parammmm",paramData);
	var formData = new FormData();
	formData.append("pedidoDeVentas", paramData.pedidoDeVentas);
    formData.append("codigoArticulo", paramData.codigoArticulo);
    formData.append("descripcion", paramData.descripcion);
    formData.append("numeroLote", paramData.numeroLote);	
    formData.append("ubicacion", paramData.ubicacion);
    formData.append("idPallet", paramData.idPallet);
	formData.append("fechaCaducidad", paramData.fechaCaducidad);
    formData.append("cantidad", paramData.cantidad);
    formData.append("codigoHijo", paramData.codigoHijo);


	const response = await axios.post(`${API_BASE_URL}/servicioregistrardetallearticulo.php`,formData);
    console.log("Registrado",response.data);
    return dispatch({
        type: REGISTRAR_DETALLE_ARTICULO,
        status: response.status,
        data: response.data
    })  
}  


export const eliminarDetalleHijos = (paramData) => async dispatch => {
	console.log("Parammmm",paramData);
	var formData = new FormData();
	formData.append("codigoHijo", paramData.codigoHijo);
	const response = await axios.post(`${API_BASE_URL}/servicioeliminardetallehijos.php`,formData);
    console.log("Eliminados",response.data);
    return dispatch({
        type: ELIMINAR_DETALLE_HIJOS,
        status: response.status,
        data: response.data
    })  
}  
/*
var formData = new FormData();
	formData.append("username", paramData.username);
    formData.append("password", paramData.password);*/