import React, { Component, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEye, faTimes, faWindowRestore } from '@fortawesome/free-solid-svg-icons' //Esto es para importar iconos, se deben mencionar cada icono especifico
import { Table, Button, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import moment from 'moment/moment';
import { modificarAvanceOrden,anularOrden  } from '../../redux/ordenVenta/OrdenVentaActions';
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
        this.leerOrdenes();
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
                <Table className="table-sm " id="tabla" role="tabpanel" aria-labelledby="home-tab" responsive hover >
                    <thead className="thead-dark bg-dark text-white">
                        <tr className='align-middle'
                            scope="col"
                            style={{ textAlign: 'center', fontSize: '12px' }}>
                            {/*<th scope="col">Id Orden</th>*/}
                            <th scope="col">#ENV</th>
                            {/* <th scope="col">Id Cliente</th>*/}
                            <th scope="col">Nombre Cliente</th>
                            {/* <th scope="col" width="200px">Referencia</th>*/}
                            <th scope="col" width="100px">Asignar</th>
                            <th scope="col" width="100px">Responsable</th>
                            {/* <th scope="col">Fecha de Subida</th>
                                <th scope="col">Fecha de Inicio</th> */}
                            <th scope="col" width="100px">Iniciado</th>
                            <th scope="col" width="100px">Finalizado</th>
                            <th scope="col" width="100px">Estado</th>
                            <th scope="col">Avance</th>
                            <th colSpan={3}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody >
                        {datosTabla.map((itemOrden) =>
                            <tr className='align-middle' scope="row" 
                            key={itemOrden.idOrden} 
                            ref={ref => (this.accordionContent[itemOrden.idOrden] = ref)} 
                            id={"li-orden-" + itemOrden.idOrden} 
                            style={{ textAlign: 'center', fontSize: '12px' }} 
                            onClick={() => this.seleccionarOrden(itemOrden, itemOrden.idOrden)}>
                                {/*<td>{itemOrden.idOrden}</td>*/}
                                <td style={{ textAlign: 'center', fontSize: '12px' }}>{itemOrden.envio}</td>
                                {/*<td style={{ textAlign: 'center', fontSize: '8px' }}>{itemOrden.idClienteAx}</td>*/}
                                <td style={{ textTransform: 'uppercase', textAlign: 'left', fontSize: '15px'  }}>{itemOrden.nombreCliente}</td>
                                {/*<td style={{ textTransform: 'lowercase', textAlign: 'left' }}>{itemOrden.referencia}</td>*/}
                                <td title="Personal disponible para asignar la orden" >
                                    {itemOrden.estado !== '6' ?
                                        <>
                                            {itemOrden.estado == '1' || itemOrden.estado == '2' ?
                                                <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={this.seleccionarUsuario} style={{ width: '100px', fontSize: "10px" }}>
                                                    <option value='0'>Seleccione</option>
                                                    {this.state.listaUsuarios.map((usuario) => {
                                                        if (usuario.nivelUsuario == 3 && usuario.estado == 1) {
                                                            if (usuario.idUsuario == itemOrden.asignadoA) {
                                                                return (<option key={usuario.idUsuario} value={usuario.idUsuario}>{usuario.username}</option>);
                                                            } else {
                                                                return (<option key={usuario.idUsuario} value={usuario.idUsuario}>{usuario.username}</option>);
                                                            }
                                                        }
                                                    }
                                                    )}
                                                </select> 
                                                :<>
                                                    Asignado
                                                </>
                                            }
                                        </>
                                        :<span>
                                            Anulada
                                        </span>
                                    }
                                </td>
                                <td style={{ textAlign: 'center', }}>{this.state.listaUsuarios.map((usuario) => (
                                    usuario.idUsuario == itemOrden.asignadoA 
                                    ? <span style={{ backgroundColor: "#00ff00", color: '#000000', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }} 
                                    key={usuario.idUsuario}>{usuario.username}</span> 
                                    : null
                                ))}</td>
                                <td title="Persona encargada del picking" >{itemOrden.fechaInicio}</td>
                                <td title="Persona encargada del picking" >{itemOrden.fechaCompletado}</td>
                                <td title="Estado de la orden" style={{ textAlign: 'center', fontSize: '10px' }}>{this.mostrarEstado(itemOrden.estado)}</td>
                                <td title="Porcentaje de avance de la orden" >{itemOrden.avance}%</td>
                                <td>{itemOrden.estado !== '6' ?
                                    <NavLink to={"/detalleorden/" + itemOrden.idOrden + "-" + itemOrden.envio}>
                                        <Button className="btn  btn-sm" title="Ver detalle de orden"><FontAwesomeIcon icon={faEye} /></Button></NavLink>
                                    : <Button className="btn btn-secondary  btn-sm" title="Ver detalle de orden" disabled><FontAwesomeIcon icon={faEye} /></Button>}</td>
                                <td>{itemOrden.estado !== '6' && itemOrden.estado !== '5' ?
                                    <>{itemOrden.estado == '4' ?
                                        <Button className="btn btn-warning  btn-sm" title="Finalizar orden" onClick={() => this.finalizarOrden(itemOrden)}><FontAwesomeIcon icon={faCheck} /></Button>
                                        : <Button className="btn btn-success  btn-sm" title="Asignar orden" onClick={() => this.asignarOrden(itemOrden)}><FontAwesomeIcon icon={faCheck} /></Button>}
                                    </>
                                    : <Button className="btn btn-secondary btn-sm" title="" disabled><FontAwesomeIcon icon={faCheck} /></Button>}</td>
                                <td>{itemOrden.estado !== '6' ?
                                    <>{itemOrden.estado == '5' ?
                                        <a className="btn btn-secondary  btn-sm" title="Anular Orden" disabled><FontAwesomeIcon icon={faTimes} /></a>
                                        : <a className="btn btn-danger  btn-sm" title="Anular Orden" onClick={() => this.anularOrdenes(itemOrden)}><FontAwesomeIcon icon={faTimes} /></a>
                                    }</>
                                    : <a className="btn btn-secondary  btn-sm" title="Anular Orden" disabled><FontAwesomeIcon icon={faTimes} /></a>}</td>
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
        Swal.fire({
            title: '¿Está Seguro',
            text: "De finalizar esta orden?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#369978',
            confirmButtonText: 'Si, finalizar',
            cancelButtonText: 'Cancelar',
            iconColor: '#369978'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("ENTRO AL SERVICIO FECHA");
                console.log(itemOrden.estado);
                if (itemOrden.estado == "4") {
                    console.log("ENTRO AL SERVICIO FECHA");
                    console.log(itemOrden.estado);

                    const rutaServicio = "http://megalabs.digitalbroperu.com/servicioactualizarfechacompletadaorden.php"
                    var formData = new FormData();
                    var date = moment().format('DD/MM/YYYY h:mm:ss');
                    formData.append("idOrden", itemOrden.idOrden);
                    formData.append("abierto", '2');
                    formData.append("fechaCompletado", date);
                    fetch(rutaServicio, { method: 'POST', body: formData }).then(() => { this.leerOrdenes(); })
                }
                const response = store.dispatch(modificarAvanceOrden({
                    idOrden: itemOrden.idOrden,
                    estado: 5,
                    avance: 100
                }));
                Swal.fire({
                    title: '¡Orden Finalizada!',
                    text: "Orden finalizada correctamente",
                    icon: 'success',
                    confirmButtonColor: '#369978',
                    confirmButtonText: 'Listo',
                    iconColor: '#369978'
                });
                this.leerOrdenes();
            }
        })
    }

    actualizarFechaFinalizado = (itemOrden => {
        if (itemOrden.abierto != '1') {
        console.log("ENTRO AL SERVICIO FECHA");
        const rutaServicio = "http://megalabs.digitalbroperu.com/servicioactualizarfechacompletadaorden.php"
        var formData = new FormData();
        var date = moment().format('DD/MM/YYYY h:mm:ss');
        formData.append("idOrden", itemOrden.idOrden);
        formData.append("abierto", '2');
        formData.append("fechaCompletado", date);
        fetch(rutaServicio, { method: 'POST', body: formData }).then(() => { this.leerOrdenes(); })
        }
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
            console.log(this.state.ordenSeleccionada)
        }
        this.setState({ ordenSeleccionada: itemOrden })
        this.accordionContent[itemOrden.idOrden].classList.add("active");
    }

    mostrarEstado(estado) {
        switch (estado) {
            case '1':
                return <span style={{ backgroundColor: "#ffff00", color: '#000000', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }}>Pendiente</span>
            case '2':
                return <span style={{ backgroundColor: "#00ff00", color: '#000000', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }}>Asignado</span>
            case '3':
                return <span style={{ backgroundColor: "#ff3333", color: '#ffffff', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }}>En Curso</span>
            case '4':
                return <span style={{ backgroundColor: "#3366ff", color: '#ffffff', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }}>Atendido</span>
            case '5':
                return <span style={{ backgroundColor: "#00802b", color: '#ffffff', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }}>Finalizado</span>
            case '6':
                return <span style={{ backgroundColor: "#8c8c8c", color: '#ffffff', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }}>Anulado</span>
        }
    }
    mostrarEliminar = (itemOrden => {
        var respuesta = window.confirm("¿Está seguro que desea eliminar la Orden " + itemOrden.envio + "?")
        if (respuesta === true) {
            const rutaServicio = "http://megalabs.digitalbroperu.com/servicioeliminarorden.php"
            var formData = new FormData();
            formData.append("idOrden", itemOrden.idOrden);
            fetch(rutaServicio, { method: 'POST', body: formData }).then(() => { this.leerOrdenes(); })
        }
    })
    
/*
    actualizarFechaApertura = (itemOrden => {
        console.log(itemOrden);
        if (itemOrden.abierto != '1') {
            const rutaServicio = "http://megalabs.digitalbroperu.com/servicioactualizarfechainicioorden.php"
            var formData = new FormData();
            var date = moment().format('DD/MM/YYYY h:mm:ss');
            console.log(date);
            formData.append("idOrden", itemOrden.idOrden);
            formData.append("abierto", '1');
            formData.append("fechaInicio", date);
            fetch(rutaServicio, { method: 'POST', body: formData }).then(() => { this.leerOrdenes(); })
        }
    })
*/
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
