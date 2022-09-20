import { useEffect, useState } from 'react';
import { listarOrdenDetallePorId, modificarOrdenDetalle } from '../../../redux/ordenVenta/OrdenVentaActions';
import store from '../../../redux/Store';
import { StatusCodes } from 'http-status-codes';
import { Button, ProgressBar, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCirclePlus, faDeleteLeft, faEdit, faTimes, faX } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { toastme } from 'toastmejs';

const ListadoDetalle = ({ id, progreso, setProgress, cod }) => {

    const [datosTabla, setDatosTabla] = useState([]);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState({});
    const [rowDataArticulos, setRowDataArticulos] = useState([]);
    const [progresoLocal, setProgresoLocal] = useState();

    useEffect(() => {
        console.log("muestra", id);
        listaOrdernesServicio(id);
    }, []);

    const listaOrdernesServicio = async (id) => {
        try {
            const response = await store.dispatch(listarOrdenDetallePorId(id));
            const progressDb = (100 / response.detalleOrden.filter(item => item.rama == 1).length) * response.detalleOrden.filter(item => item.listo == 1).length;
            if (response.status === StatusCodes.OK) {
                if (progressDb == 100) setProgresoLocal(progressDb);
                setProgress(progressDb == 0 ? 0 : progressDb);
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

    const cambiarProgreso = (e, idArticulo) => {
        const checked = e.target.checked;
        console.log("checked", idArticulo);
        if (checked) {
            console.log("datosTabla.length", datosTabla.filter(item => item.rama == 1).length);
            console.log("progreso", progreso);
            setProgress(progreso + 100 / datosTabla.filter(item => item.rama == 1).length);
            setRowDataArticulos((prev) => [...prev, idArticulo]);
        }
        else {
            setProgress(progreso - 100 / datosTabla.filter(item => item.rama == 1).length);
            const index = rowDataArticulos.indexOf(idArticulo);
            const rows = [...rowDataArticulos];
            rows.splice(index, 1);
            setRowDataArticulos(rows);
        }
    }

    const contadorfilashijo = (index) => {
        const newItems = datosTabla.splice(0, index);
        console.log('newsitem', newItems);
        return 3;
    }
    const guardarArticulos = async (json) => {
        console.log("json", json);
        //validando que exista detalle de orden
        //console.log("ddd",json);
        if (json.length > 0) {
            try {
                json.map(async (item) => {
                    try {
                        console.log(item.pedidoDeVentas);
                        const response = await store.dispatch(modificarOrdenDetalle({
                            idArticulo: item
                        }));
                        if (response.status === StatusCodes.OK) {
                            toastme.success(
                                `Artículo Guardado`,
                            );
                        }

                    } catch (error) {
                        console.log(error);
                    }
                });

                setProgresoLocal(progreso);
                listaOrdernesServicio(id);
            } catch (error) {
                toastme.error(
                    error
                );
            }
        } else {
            toastme.error(
                `No hay Cambios en la orden`
            );
        }
    }
    return (
        <section>

            <div className="table-responsive container-fluid " id="tabla" role="tabpanel" aria-labelledby="home-tab">
                <Table className="table-sm border-white" responsive bordered hover striped >
                    <thead className="thead-dark bg-dark text-white" >
                        <tr className='align-middle' scope="col" style={{ textAlign: 'center', fontSize: '12px' }}>
                            {/*<th>Id Orden</th>*/}
                            {/*<th scope="col">Id</th> */}
                            {/*<th scope="col" width="50px">Pedido Venta</th>*/}
                            <th scope="col" width="50px">Codigo Articulo</th>
                            <th scope="col" style={{width:'400px'}}>Descripcion</th>
                            <th scope="col" width="50px">N° Lote</th>
                            <th scope="col" width="50px">Ubicacion</th>
                            <th scope="col" width="50px">Id de Pallet</th>
                            <th scope="col"  style={{ textAlign: 'center',width:'100px' }}>Fecha de Caducidad</th>
                            <th scope="col"  style={{ textAlign: 'center',width:'50px' }}>Cantidad</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Opciones</th>

                        </tr>
                    </thead>
                    <tbody>
                        {datosTabla.map((itemDetalle, index) =>
                            <tr className='align-middle' scope="row" key={index}>
                                {/* {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold' }}>{itemDetalle.idArticulo}</td>
                                    : <td colSpan={4}></td>
                                } */}
                                {/*{itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold' }}>{itemDetalle.pedidoDeVentas}</td>
                                    : null
                                } */}
                                {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold', fontSize: '12px' }}>{itemDetalle.codigoArticulo}</td>
                                    : null
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold', fontSize: '12px' }}>{itemDetalle.descripcion}</td>
                                    : null
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold', fontSize: '12px' }}>{itemDetalle.numeroLote}</td>
                                    : <td>{itemDetalle.numeroLote}</td>
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold', fontSize: '12px' }}></td>
                                    : <td>{itemDetalle.ubicacion}</td>
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold', fontSize: '12px'  }}>{itemDetalle.idPallet}</td>
                                    : <td style={{ fontWeight: 'bold', fontSize: '12px'  }}>{itemDetalle.idPallet}</td>
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold', fontSize: '12px'   }}>{itemDetalle.fechaCaducidad}</td>
                                    : <td style={{ fontSize: '12px'   }}>{itemDetalle.fechaCaducidad}</td>
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ textAlign: 'center',width:'50px', fontWeight: 'bold' }}>{itemDetalle.cantidad}</td>
                                    : <td>{itemDetalle.cantidad}</td>
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ width:'50px'}}>
                                        {itemDetalle.listo == 1
                                            ? <div className="form-check"><input className="form-check-input" type="checkbox" id={itemDetalle.idArticulo} disabled checked /></div>
                                            : <div className="form-check"><input className="form-check-input" type="checkbox" id={itemDetalle.idArticulo} onChange={(e) => cambiarProgreso(e, itemDetalle.idArticulo)} /></div>
                                        }
                                    </td>
                                    : <td></td>
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ textAlign: 'center',width:'100px', fontWeight: 'bold' }}>
                                        {itemDetalle.listo == 0
                                            ? <NavLink to={"/detallearticulo/" + cod+"-"+itemDetalle.idArticulo} className="nav"><Button><FontAwesomeIcon icon={faEdit} /></Button></NavLink>
                                            : <NavLink to={"/detallearticulo/" + cod+"-"+itemDetalle.idArticulo} onClick={() => {
                                                if (window.confirm('¿Estas seguro que deseas eliminar el progreso de este articulo y asignarlos nuevamente?')) { console.log("ELIMINAR HIJOS Y EDITAR NUEVAMENTE") };
                                            }} className="nav">
                                                <Button>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                            </NavLink>
                                        }
                                    </td>
                                    : null
                                }
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className="offset-6 col-6">
                <div className='row'>
                    {progresoLocal == 100 ?
                        <div className='offset-6 col-6'>
                            <NavLink to={"/orden"} className="nav"><Button className='btn-primary col-sm-12'>Finalizar Orden</Button></NavLink>
                        </div>
                        : <>
                            <div className='col-6'>
                                <NavLink to={"/orden"} className="nav"><Button className='btn-secondary col-sm-12'>Cancelar</Button></NavLink>
                            </div>
                            <div className='col-6'>
                                <Button className='btn-success col-sm-12' onClick={() => guardarArticulos(rowDataArticulos)}>Guardar</Button>
                            </div>
                        </>
                    }

                </div>
            </div>
        </section>
    )
}
export default ListadoDetalle;