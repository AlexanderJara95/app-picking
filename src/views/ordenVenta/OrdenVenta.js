import React, { Component, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEye, faTimes, faWindowRestore } from '@fortawesome/free-solid-svg-icons' //Esto es para importar iconos, se deben mencionar cada icono especifico
import { Table, Button, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import moment from 'moment/moment';
import { modificarAvanceOrden } from '../../redux/ordenVenta/OrdenVentaActions';
import { anularOrden } from '../../redux/ordenVenta/OrdenVentaActions';

import store from '../../redux/Store';
import Swal from 'sweetalert2';


class OrdenVenta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaOrdenes: [],
            listaUsuarios: [],
            listaEstados: [],
            ordenSeleccionada: '',
            usuarioAsignado: 0,
            confirmarAsignar: '',
            checkAsignar: false,
            changeColor: '',
            codigoOrden: ''
        }
        this.accordionContent = [];
    }

    componentDidMount() {
        this.leerOrdenes();
        this.leerEstado();
        this.leerUsuarios();
    }

    componentDidUpdate() {
        // this.leerOrdenes();
    }

    leerOrdenes() {
        const rutaServicio = "https://megalabs.digitalbroperu.com/serviciolistarorden.php";
        fetch(rutaServicio)
            .then(
                res => res.json() //indicamos que el objeto devuelto por dicha solicitud al servicio, sera un Json
            )
            .then(
                (result) => {
                    this.setState({
                        listaOrdenes: result

                    });  //aca se crean las variables globales/ de estado
                }
            )
    }

    leerUsuarios() {
        const rutaServicio = "https://megalabs.digitalbroperu.com/serviciolistarusuarios.php"
        fetch(rutaServicio)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        listaUsuarios: result
                    });
                })
    }

    leerEstado() {
        const rutaServicio = "https://megalabs.digitalbroperu.com/serviciolistarestadosorden.php"
        fetch(rutaServicio)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        listaEstados: result
                    });
                })
    }

    /*ES PARA OBTENER EL ID DEL USUARIO CLICKEADO EN LA LISTA DE SELECCION PARA ASIGNAR LA ORDEN */
    seleccionarUsuario = event => {
        this.setState({ usuarioAsignado: event.currentTarget.value });
    }

    /*sin uso aun*/
    /*
    activarBoton = (event, key) => {
        console.log(event.target, key);
    }
    */

    dibujarTabla(datosTabla) {
        if (datosTabla !== null) {
            return (
                <Table className="table-sm border-white" id="tabla" role="tabpanel" aria-labelledby="home-tab" responsive bordered hover striped>
                    <thead className="thead-dark bg-dark text-white">
                        <tr className='align-middle'
                            scope="col"
                            style={{ textAlign: 'center', fontSize: '12px' }}>
                            {/*<th scope="col">Id Orden</th>*/}
                            <th scope="col">#PV</th>
                            <th scope="col">Id Cliente</th>
                            <th scope="col">Nombre Cliente</th>
                            <th scope="col" width="200px">Referencia</th>
                            <th scope="col">Asignar</th>
                            <th scope="col">Asignado A</th>
                            {/* <th scope="col">Fecha de Subida</th>
                                <th scope="col">Fecha de Inicio</th> */}
                            <th scope="col" width="100px">Iniciado</th>
                            <th scope="col" width="100px">Finalizado</th>
                            <th scope="col" width="100px">Estado</th>
                            <th scope="col">% Avance</th>
                            <th colSpan={3}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody >
                        {datosTabla.map((itemOrden) =>
                            <tr className='align-middle' scope="row" key={itemOrden.idOrden} ref={ref => (this.accordionContent[itemOrden.idOrden] = ref)} id={"li-orden-" + itemOrden.idOrden} style={{ textAlign: 'center', fontSize: '12px' }} onClick={() => this.seleccionarOrden(itemOrden, itemOrden.idOrden)}>
                                {/*<td>{itemOrden.idOrden}</td>*/}
                                <td style={{ textAlign: 'center', fontSize: '10px' }}>{itemOrden.pedidoDeVentas}</td>
                                <td>{itemOrden.idClienteAx}</td>
                                <td style={{ textTransform: 'lowercase', textAlign: 'left' }}>{itemOrden.nombreCliente}</td>
                                <td style={{ textTransform: 'lowercase', textAlign: 'left' }}>{itemOrden.referencia}</td>
                                <td title="Personal disponible para asignar la orden" >
                                    {itemOrden.estado !== 'Anulado' ?
                                        <>
                                            {itemOrden.estado == 'Asignado' || itemOrden.estado == 'Por Asignar' ?
                                                <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={this.seleccionarUsuario} style={{ width: '100px', fontSize: "10px" }}>
                                                    <option value='0'>Seleccione</option>
                                                    {this.state.listaUsuarios.map((usuario) => {
                                                        if (usuario.nivelUsuario == 3) {
                                                            if (usuario.idUsuario == itemOrden.asignadoA) {
                                                                return (<option key={usuario.idUsuario} value={usuario.idUsuario}>{usuario.nombre}</option>);
                                                            } else {
                                                                return (<option key={usuario.idUsuario} value={usuario.idUsuario}>{usuario.nombre}</option>);
                                                            }
                                                        }
                                                    }
                                                    )}
                                                </select> : <>Asignado</>
                                            }
                                        </>
                                        : <span> Orden Anulada</span>
                                    }
                                </td>
                                <td style={{ textAlign: 'center', }}>{this.state.listaUsuarios.map((usuario) => (
                                    usuario.idUsuario == itemOrden.asignadoA ? <span style={{ backgroundColor: "#00ff00", color: '#000000', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }} key={usuario.idUsuario}>{usuario.nombre}</span> : null
                                ))}</td>
                                <td title="Persona encargada del picking" >{itemOrden.fechaInicio}</td>
                                <td title="Persona encargada del picking" >{itemOrden.fechaCompletado}</td>
                                {/*<td  title="Fecha de asignacion" >{itemOrden.fechaInicio}</td>
                                    <td  title="Fecha de culminada" >{itemOrden.fechaCompletado}</td> */}
                                <td title="Estado de la orden" style={{ textAlign: 'center', fontSize: '10px' }}>{this.mostrarEstado(itemOrden.estado)}</td>
                                <td title="Porcentaje de avance de la orden" >{itemOrden.avance}%</td>
                                <td>{itemOrden.estado !== 'Anulado' ?
                                    <NavLink to={"/detalleorden/" + itemOrden.idOrden + "-" + itemOrden.pedidoDeVentas}>
                                        <Button className="btn" title="Ver detalle de orden" onClick={() => this.actualizarFechaApertura(itemOrden)}><FontAwesomeIcon icon={faEye} /></Button></NavLink>
                                    : <Button className="btn btn-secondary" title="Ver detalle de orden" disabled><FontAwesomeIcon icon={faEye} /></Button>}</td>
                                <td>{itemOrden.estado !== 'Anulado' && itemOrden.estado !== 'Finalizado' ?
                                    <>{itemOrden.estado == 'Atendido' ?
                                        <Button className="btn btn-warning" title="Finalizar orden" onClick={() => this.finalizarOrden(itemOrden)}><FontAwesomeIcon icon={faCheck} /></Button>
                                        : <Button className="btn btn-success" title="Asignar orden" onClick={() => this.asignarOrden(itemOrden)}><FontAwesomeIcon icon={faCheck} /></Button>}
                                    </>
                                    : <Button className="btn btn-secondary" title="" disabled><FontAwesomeIcon icon={faCheck} /></Button>}</td>
                                <td>{itemOrden.estado !== 'Anulado' ?
                                    <>{itemOrden.estado == 'Finalizado' ?
                                        <a className="btn btn-secondary" title="Anular Orden" disabled><FontAwesomeIcon icon={faTimes} /></a>
                                        : <a className="btn btn-danger" title="Anular Orden" onClick={() => this.anularOrdenes(itemOrden)}><FontAwesomeIcon icon={faTimes} /></a>
                                    }</>
                                    : <a className="btn btn-secondary" title="Anular Orden" disabled><FontAwesomeIcon icon={faTimes} /></a>}</td>
                                {/* estuctura para condicion:
                                        {condicion a evaluar ? que pasa si es true : que pasa si es false} */}
                            </tr>
                        )}
                        <tr>
                        </tr>
                    </tbody>
                </Table>
            )
        } else {
            return (
                <Alert variant="danger" style={{ width: '100%', textAlign: 'center' }}>
                    <Alert.Heading>Listado de Ordenes actualmente vacio</Alert.Heading>
                </Alert>
            )
        }
    }

    asignarOrden = (idOrden) => {
        if (this.state.ordenSeleccionada.idOrden !== null && this.state.usuarioAsignado !== 0) {
            //console.log("HUUUU");
            const rutaServicio = "https://megalabs.digitalbroperu.com/servicioasignarorden.php"
            var formData = new FormData();
            formData.append("idOrden", this.state.ordenSeleccionada.idOrden);
            formData.append("asignadoPor", window.usuario.idUsuario);
            formData.append("asignadoA", this.state.usuarioAsignado);
            //console.log("orden pre-servicio:", this.state.ordenSeleccionada.idOrden);
            //console.log("usuario pre-servicio:", this.state.usuarioAsignado);
            fetch(rutaServicio, {
                method: 'POST',
                body: formData
            }).then(
                () => {
                    this.leerOrdenes();
                }
            )
        } else {
            return (
                <Alert variant="danger" style={{ width: '100%', textAlign: 'center' }}>
                    <Alert.Heading>Listado de Ordenes actualmente vacio</Alert.Heading>
                </Alert>
            )
        }
        this.setState({ usuarioAsignado: 0 });
        this.setState({ ordenSeleccionada: [] });
    }
    finalizarOrden = async (itemOrden) => {
        this.actualizarFechaFinalizado(itemOrden);
        const response = await store.dispatch(modificarAvanceOrden({
            idOrden: itemOrden.idOrden,
            estado: 5,
            avance: 100
        }));
        this.leerOrdenes();
    }

    actualizarFechaFinalizado = (itemOrden => {
        console.log("ENTRO AL SERVICIO FECHA");
        const rutaServicio = "http://megalabs.digitalbroperu.com/servicioactualizarfechacompletadaorden.php"
        var formData = new FormData();
        var date = moment().format('YYYY-MM-DD h:mm:ss');
        formData.append("idOrden", itemOrden.idOrden);
        formData.append("abierto", '2');
        formData.append("fechaCompletado", date);
        fetch(rutaServicio, { method: 'POST', body: formData }).then(() => { this.leerOrdenes(); })
    })

    anularOrdenes = (itemOrden) => {
        Swal.fire({
            title: '¿Está Seguro',
            text: "De anular esta orden?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#369978',
            confirmButtonText: 'Si, anular',
            cancelButtonText: 'Cancelar',
            iconColor: '#dc3545'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = store.dispatch(anularOrden({
                    idOrden: itemOrden.idOrden,
                }))
                Swal.fire({
                    title: '¡Anulado!',
                    text: "Oreden anulada correctamente",
                    icon: 'success',
                    confirmButtonColor: '#369978',
                    confirmButtonText: 'Listo',
                })
                this.leerOrdenes();
            }
        })
    }

    seleccionarOrden(itemOrden) {
        //esta logica siguiente es para capturar el item clickeado y luego si se clickea otro, desmarque como "active" el anterior
        if (this.state.ordenSeleccionada !== '') {
            this.accordionContent[this.state.ordenSeleccionada.idOrden].classList.remove("active");
        }
        this.setState({ ordenSeleccionada: itemOrden })
        this.accordionContent[itemOrden.idOrden].classList.add("active");
    }

    mostrarEstado(estado) {
        switch (estado) {
            case 'Por Asignar':
                return <span style={{ backgroundColor: "#ffff00", color: '#000000', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }}>Por Asignar</span>
            case 'Asignado':
                return <span style={{ backgroundColor: "#00ff00", color: '#000000', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }}>Asignado</span>
            case 'En Proceso':
                return <span style={{ backgroundColor: "#ff3333", color: '#ffffff', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }}>En Proceso</span>
            case 'Atendido':
                return <span style={{ backgroundColor: "#3366ff", color: '#ffffff', borderRadius: '20px', padding: '5px', paddingLeft: '25px', paddingRight: '25px', fontWeight: 'bolder' }}>Atendido</span>
            case 'Finalizado':
                return <span style={{ backgroundColor: "#00802b", color: '#ffffff', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }}>Finalizado</span>
            case 'Anulado':
                return <span style={{ backgroundColor: "#8c8c8c", color: '#ffffff', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }}>Anulado</span>
        }
    }
    mostrarEliminar = (itemOrden => {
        var respuesta = window.confirm("¿Está seguro que desea eliminar la Orden " + itemOrden.pedidoDeVentas + "?")
        if (respuesta === true) {
            const rutaServicio = "http://megalabs.digitalbroperu.com/servicioeliminarorden.php"
            var formData = new FormData();
            formData.append("idOrden", itemOrden.idOrden);
            fetch(rutaServicio, { method: 'POST', body: formData }).then(() => { this.leerOrdenes(); })
        }
    })

    actualizarFechaApertura = (itemOrden => {
        console.log(itemOrden);
        if (itemOrden.abierto != '1') {
            const rutaServicio = "http://megalabs.digitalbroperu.com/servicioactualizarfechainicioorden.php"
            var formData = new FormData();
            var date = moment().format('YYYY-MM-DD h:mm:ss');
            console.log(date);
            formData.append("idOrden", itemOrden.idOrden);
            formData.append("abierto", '1');
            formData.append("fechaInicio", date);
            fetch(rutaServicio, { method: 'POST', body: formData }).then(() => { this.leerOrdenes(); })
        }
    })

    render() {
        let contenidoTablaOrden = this.dibujarTabla(this.state.listaOrdenes)
        return (
            <section id="orden" className="padded">
                {contenidoTablaOrden}
            </section>
        );
    }
}
export default OrdenVenta;
