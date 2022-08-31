import React, { Component } from 'react'
import DetalleOrden from './DetalleOrden';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faTimes, faWindowRestore } from '@fortawesome/free-solid-svg-icons' //Esto es para importar iconos, se deben mencionar cada icono especifico
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

class OrdenVenta2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaOrdenes: [],
            ordenSeleccionada: ''

        }
    }

    /*
    componentWillReceiveProps(props) {
        console.log(props.detalleOrden)
        this.leerDetalle(props.detalleOrden.idOrden)
    }
    */

    componentDidMount() {
        this.leerOrdenes();
    }
    
    componentDidUpdate() {
        this.leerOrdenes();
    }
    
    leerOrdenes() {
        const rutaServicio = "https://megalabs.digitalbroperu.com/serviciolistarorden.php"
        fetch(rutaServicio)
            .then(
                res => res.json() //indicamos que el objeto devuelto por dicha solicitud al servicio, sera un Json
            )
            .then(
                (result) => {
                    //console.log(result);
                    this.setState({
                        listaOrdenes: result
                    }) //aca se crean las variables globales/ de estado
                }
            )
    }


    dibujarTabla(datosTabla) {
        return (
            <div className="table-responsive table-bordered" id="tabla" role="tabpanel" aria-labelledby="home-tab" >
                <table id="tabla" className="table" >
                    <thead id="thead" className="table thead-dark">
                        <tr>
                            <th>Id Orden</th>
                            <th>Pedido de Ventas</th>
                            <th>Id Cliente AX</th>
                            <th>Nombre Cliente</th>
                            <th>Referencia</th>
                            <th>Asignado por</th>
                            <th>Completado por</th>
                            <th>Fecha de Subida</th>
                            <th>Fecha de Inicio</th>
                            <th>Fecha Terminado</th>
                            <th>Estado</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosTabla.map(itemOrden =>
                            <tr key={itemOrden.idOrden}
                                id={"li-orden-" + itemOrden.idOrden}
                                onClick={() => this.seleccionarOrden(itemOrden)}>
                                <td>{itemOrden.idOrden}</td>
                                <td>{itemOrden.pedidoDeVentas}</td>
                                <td>{itemOrden.idClienteAx}</td>
                                <td>{itemOrden.nombreCliente}</td>
                                <td>{itemOrden.referencia}</td>
                                <td>{itemOrden.asignadoPor}</td>
                                <td>{itemOrden.asignadoA}</td>
                                <td>{itemOrden.fechaSubida}</td>
                                <td>{itemOrden.fechaInicio}</td>
                                <td>{itemOrden.fechaCompletado}</td>
                                <td>{itemOrden.estado}</td>
                                <td><FontAwesomeIcon icon={faEdit} data-bs-toggle="modal" data-bs-target="#exampleModalCenter" /> </td>
                                <td><FontAwesomeIcon icon={faTimes} onClick={() => this.mostrarEliminar(itemOrden)} /></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    mostrarEliminar = (itemOrden => {
        var respuesta = window.confirm("¿Está seguro que desea eliminar la Orden " + itemOrden.pedidoDeVentas + "?")
        if (respuesta === true) {
            const rutaServicio = "http://megalabs.digitalbroperu.com/servicioeliminarorden.php"
            var formData = new FormData();
            formData.append("idOrden", itemOrden.idOrden);
            fetch(rutaServicio, { method: 'POST', body: formData })
                .then(() => { this.leerCategorias(); })
        }
    })

    alertaDetalle() {
        return (
            <div className="alert alert-danger" role="alert">
                This is a danger alert—check it out!
            </div>
        )

    }

    seleccionarOrden(itemOrden) {
        //console.log(itemOrden);
        //esta logica siguiente es para capturar el item clickeado y luego si se clickea otro, desmarque como "active" el anterior
        if (this.state.ordenSeleccionada !== '') {
            document.getElementById("li-orden-" + this.state.ordenSeleccionada.idOrden).classList.remove("active"); //esto hace que se marque el elemento cliqueado como "activo"
        } else {
            this.alertaDetalle();
        }

        this.setState({ ordenSeleccionada: itemOrden })

        document.getElementById("li-orden-" + itemOrden.idOrden).classList.add("active"); //esto hace que se marque el elemento cliqueado como "activo"
    }

    validarDetalle(ordenSeleccionada){
            <DetalleOrden detalleOrden={this.state.ordenSeleccionada} />
        
    }


    
    /*<DetalleOrden detalleOrden={this.state.ordenSeleccionada} />*/ 
    render() {
        let contenidoTablaOrden = this.dibujarTabla(this.state.listaOrdenes)
        let contenidoTablaDetalle = <DetalleOrden detalleOrden={this.state.ordenSeleccionada} />

        return (
            <section id="orden" className="padded">
                <div className="container-fluid">
                    <h2>Ordenes</h2>
                    <div className="row">
                        {contenidoTablaOrden}
                    </div>
                    <div className="modal fade container" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog   modal-dialog-centered container-fluid" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="btn close" data-dismiss="modal" aria-label="Close" data-bs-toggle="modal" data-bs-target="#exampleModalCenterTitle">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                        { contenidoTablaDetalle}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" data-bs-toggle="modal" data-bs-target="#exampleModalCenterTitle">Cerrar</button>
                                    <button type="button" className="btn btn-primary">Guardar cambios</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}
export default OrdenVenta2;