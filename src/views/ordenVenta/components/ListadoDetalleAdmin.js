import { useEffect, useState } from 'react';
import { listarOrdenDetallePorId } from '../../../redux/ordenVenta/OrdenVentaActions';
import store from '../../../redux/Store';
import { StatusCodes } from 'http-status-codes';
import { Button, ProgressBar, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';


const ListadoDetalleAdmin = ({ id, progreso, setProgress }) => {

    const [datosTabla, setDatosTabla] = useState([]);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState({});

    useEffect(() => {
        console.log("muestra", id);
        listaOrdernesServicio(id);
    }, []);

    const listaOrdernesServicio = async (id) => {
        try {
            const response = await store.dispatch(listarOrdenDetallePorId(id));
            console.log("listaOrden", response.detalleOrden);

            if (response.status === StatusCodes.OK) {
                setDatosTabla(response.detalleOrden);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const seleccionarOrden = (itemOrden) => {
        setOrdenSeleccionada(itemOrden);
        document.getElementById("li-articulo-" + itemOrden.idOrden).classList.add("active"); //esto hace que se marque el elemento cliqueado como "activo"   
        if (Object.keys(ordenSeleccionada).length !== 0) {
            document.getElementById("li-articulo-" + ordenSeleccionada.idOrden).classList.remove("active"); //esto hace que se marque el elemento cliqueado como "activo"
        }
        this.setState({ ordenSeleccionada: itemOrden })

        document.getElementById("li-articulo-" + itemOrden.idOrden).classList.add("active"); //esto hace que se marque el elemento cliqueado como "activo"


    }


    const cambiarProgreso = (e) => {
        const checked = e.target.checked;
        console.log("checked", checked);
        if (checked) {
            console.log("datosTabla.length", datosTabla.length);
            console.log("progreso", progreso);
            setProgress(progreso + 100 / datosTabla.length);
        }
        else {
            setProgress(progreso - 100 / datosTabla.length);
        }
    }

    return (
        <>
            <div className="table-responsive container-fluid " id="tabla" role="tabpanel" aria-labelledby="home-tab">
                <Table className="table-sm border-white" responsive bordered hover striped >
                    <thead className="thead-dark bg-dark text-white" >
                        <tr className='align-middle text-center' scope="col">
                            {/*<th>Id Orden</th>*/}
                            <th scope="col">Id</th>
                            <th scope="col">Pedido Venta</th>
                            <th scope="col">Codigo Articulo</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">N° Lote</th>
                            <th scope="col">Ubicacion</th>
                            <th scope="col">Id de Pallet</th>
                            <th scope="col">Fecha de Caducidad</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Listo</th>
                            <th scope="col">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosTabla.map((itemDetalle, index) =>
                            <tr className='align-middle'
                                scope="row"
                                key={index}>
                                <td>{itemDetalle.idArticulo}</td>
                                <td>{itemDetalle.pedidoDeVentas}</td>
                                <td>{itemDetalle.codigoArticulo}</td>
                                <td>{itemDetalle.descripcion}</td>
                                <td>{itemDetalle.numeroLote}</td>
                                <td>{itemDetalle.ubicacion}</td>
                                <td>{itemDetalle.idPallet}</td>
                                <td>{itemDetalle.fechaCaducidad}</td>
                                <td>{itemDetalle.cantidad}</td>
                                <td >
                                    <div className="form-check">
                                        {/*<input className="form-check-input" type="checkbox" value="1" id="checkdetalle" onChange={()=>this.contarProgreso()}/> */}
                                        <input className="form-check-input" type="checkbox" id="checkdetalle" onChange={(e) => cambiarProgreso(e)}  disabled/>
                                    </div>
                                </td>
                                <td><NavLink to={"/detallearticulo/"+itemDetalle.idArticulo} className="nav"><Button  disabled><FontAwesomeIcon icon={faEdit} /></Button></NavLink></td>
                                {/*<td><Button onClick={() => this.mostrarEliminar(itemDetalle)}> <FontAwesomeIcon icon={faTimes}/></Button></td> */}
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    )
}
export default ListadoDetalleAdmin;