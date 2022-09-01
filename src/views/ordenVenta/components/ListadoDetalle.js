import { useEffect, useState } from 'react';
import { listarOrdenDetallePorId } from '../../../redux/ordenVenta/OrdenVentaActions';
import store from '../../../redux/Store';
import { StatusCodes } from 'http-status-codes';
import { Button, ProgressBar, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTimes } from '@fortawesome/free-solid-svg-icons';


const ListadoDetalle = ({id,progreso,setProgress}) =>{

    const [datosTabla,setDatosTabla] = useState([]);
    const [ordenSeleccionada,setOrdenSeleccionada] = useState({});

    useEffect(()=>{
        console.log("muestra",id);
        listaOrdernesServicio(id);
    },[]);

    const listaOrdernesServicio= async(id)=>{
        try {
            const response = await store.dispatch(listarOrdenDetallePorId(id));
            console.log("listaOrden",response.detalleOrden);

            if (response.status === StatusCodes.OK) {	
                setDatosTabla(response.detalleOrden);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const seleccionarOrden=(itemOrden)=>{
        setOrdenSeleccionada(itemOrden);
        document.getElementById("li-orden-" + itemOrden.idOrden).classList.add("active"); //esto hace que se marque el elemento cliqueado como "activo"   
        if (Object.keys(ordenSeleccionada).length !== 0) {
            document.getElementById("li-orden-" + ordenSeleccionada.idOrden).classList.remove("active"); //esto hace que se marque el elemento cliqueado como "activo"
        }            
    }
    const mostrarEliminar=()=>{
        
    }
    const cambiarProgreso = (e) =>{
        const checked = e.target.checked;
        console.log("checked",checked);
        if (checked) {
            console.log("datosTabla.length",datosTabla.length);
            console.log("progreso",progreso);
            setProgress(progreso + 100/datosTabla.length);
        }      
        else {
            setProgress(progreso - 100/datosTabla.length); 
        }
    }

    return(
        <>         
            <div className="table-responsive table-bordered container-fluid" id="tabla" role="tabpanel" aria-labelledby="home-tab">
            <Table className="table" responsive bordered hover>
                <thead className="thead-dark bg-dark text-white" >
                    <tr>
                    {/*<th>Id Orden</th>*/}
                    <th>Id</th>
                    <th>Pedido de Ventas</th>
                    <th>Codigo de Articulo</th>
                    <th>Descripcion</th>
                    <th>Numero de Lote</th>
                    <th>Ubicacion</th>
                    <th>Id de Pallet</th>
                    <th>Fecha de Caducidad</th>
                    <th>Cantidad</th>
                    {/*<th>Reservado</th>*/}
                    <th></th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {datosTabla.map((itemDetalle, index) =>
                    <tr key={index}>
                        <td>{itemDetalle.idArticulo}</td>
                        <td>{itemDetalle.pedidoDeVentas}</td>
                        <td>{itemDetalle.codigoArticulo}</td>
                        <td>{itemDetalle.descripcion}</td>
                        <td>{itemDetalle.numeroLote}</td>
                        <td>{itemDetalle.ubicacion}</td>
                        <td>{itemDetalle.idPallet}</td>
                        <td>{itemDetalle.fechaCaducidad}</td>
                        <td>{itemDetalle.cantidad}</td>
                        <td>
                        <div className="form-check">
                            {/*<input className="form-check-input" type="checkbox" value="1" id="checkdetalle" onChange={()=>this.contarProgreso()}/> */}
                            <input className="form-check-input" type="checkbox" id="checkdetalle" onChange={(e)=>cambiarProgreso(e)} />
                        </div>
                        </td>
                        <td><i className='bx bxs-edit' data-bs-toggle="modal" data-bs-target="#exampleModalCenter" ></i></td>
                        <td><Button onClick={() => this.mostrarEliminar(itemDetalle)}> <FontAwesomeIcon icon={faTimes}   /></Button></td>
                    </tr>
                    )}
                </tbody>
            </Table>
            </div>
        </>
        )
}
export default ListadoDetalle;