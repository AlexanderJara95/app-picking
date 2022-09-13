import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEye, faTimes, faWindowRestore } from '@fortawesome/free-solid-svg-icons' //Esto es para importar iconos, se deben mencionar cada icono especifico
import { Table, Button, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


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
            changeColor: ''
        }
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
        console.log(event.currentTarget.value);
        this.setState({ usuarioAsignado: event.currentTarget.value });
    }

    /*sin uso aun*/
    activarBoton = (event, key) => {
        console.log(event.target, key);
    }


    dibujarTabla(datosTabla) {
        if (datosTabla !== null) {
            return (
                <div className="table-responsive container-fluid " id="tabla" role="tabpanel" aria-labelledby="home-tab" >
                    <Table className="table-sm border-white" responsive bordered hover striped>
                        <thead className="thead-dark bg-dark text-white">
                            <tr className='align-middle'
                                scope="col"
                                style={{ textAlign: 'center', fontSize: '14px' }}>
                                <th scope="col">Id Orden</th>
                                <th scope="col">Pedido de Ventas</th>
                                <th scope="col">Id Cliente AX</th>
                                <th scope="col">Nombre Cliente</th>
                                <th scope="col">Referencia</th>
                                <th scope="col">Asignar</th>
                                <th scope="col">Asignado A</th>
                                <th scope="col">Fecha de Subida</th>
                                <th scope="col">Fecha de Inicio</th>
                                <th scope="col" width="40px">Fecha Terminado</th>
                                <th scope="col" width="100px">Estado</th>
                                <th scope="col">% Avance</th>
                                <th colSpan={3}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody >
                            {datosTabla.map((itemOrden) =>
                                <tr className='align-middle' scope="row" key={itemOrden.idOrden} id={"li-orden-" + itemOrden.idOrden} style={{ textAlign: 'center', fontSize: '11px' }} onClick={() => this.seleccionarOrden(itemOrden)}>
                                    <td>{itemOrden.idOrden}</td>
                                    <td>{itemOrden.pedidoDeVentas}</td>
                                    <td>{itemOrden.idClienteAx}</td>
                                    <td>{itemOrden.nombreCliente}</td>
                                    <td>{itemOrden.referencia}</td>
                                    <td title="Personal disponible para asignar la orden"  style={{ minWidth: '130px' }}>
                                        {itemOrden.estado !== 'Anulado'?
                                        <select className="form-select form-select-sm" aria-label=".form-select-sm example" >
                                            <option value='0' onClick={this.seleccionarUsuario}>Seleccione</option>
                                            {this.state.listaUsuarios.map((usuario) => {
                                                if (usuario.nivelUsuario == 3) {
                                                    if (usuario.idUsuario == itemOrden.asignadoA) {
                                                        return (<option key={usuario.idUsuario} value={usuario.idUsuario} onClick={this.seleccionarUsuario} >{usuario.nombre}</option>);
                                                    } else {
                                                        return (<option key={usuario.idUsuario} value={usuario.idUsuario} onClick={this.seleccionarUsuario} >{usuario.nombre}</option>);
                                                    }
                                                }
                                            }
                                            )}
                                        </select>
                                        :<>Orden Anulada</>}
                                    </td>
                                    <td    style={{ textAlign: 'center', fontSize: '20px' }}>{this.state.listaUsuarios.map((usuario) => (
                                        usuario.idUsuario == itemOrden.asignadoA ? <span key={usuario.idUsuario}>{usuario.nombre}</span> : null
                                    ))}</td>
                                    <td  title="Persona encargada del picking" >{itemOrden.fechaSubida}</td>
                                    <td  title="Fecha de asignacion" >{itemOrden.fechaInicio}</td>
                                    <td  title="Fecha de culminada" >{itemOrden.fechaCompletado}</td>
                                    <td  title="Estado de la orden" >{this.mostrarEstado(itemOrden.estado)}</td>
                                    <td  title="Porcentaje de avance de la orden" >0</td>
                                    <td>{itemOrden.estado !== 'Anulado'? 
                                        <NavLink to={"/detalleorden/" + itemOrden.pedidoDeVentas}><Button className="btn secondary"  title="Ver detalle de orden"><FontAwesomeIcon icon={faEye}/></Button></NavLink>
                                        :<Button className="btn secondary"  title="Ver detalle de orden" disabled><FontAwesomeIcon icon={faEye}/></Button>}</td>
                                    <td>{itemOrden.estado !== 'Anulado'? 
                                        <Button  className="btn btn-success"  title="Asignar orden" onClick={() => {if(window.confirm('Desea asignar esta orden?')){this.asignarOrden()};}}><FontAwesomeIcon icon={faCheck} /></Button>
                                        :<Button  className="btn btn-success"  title="Asignar orden" disabled><FontAwesomeIcon icon={faCheck} /></Button>}</td>  {/*onClick={() => this.mostrarEliminar(itemOrden)} */}
                                    <td>{itemOrden.estado !== 'Anulado'? 
                                        <Button  className="btn btn-danger"  title="Anular Orden" onClick={() => this.anularOrden(itemOrden)}><FontAwesomeIcon icon={faTimes}/></Button>
                                        :<Button  className="btn btn-danger"  title="Anular Orden" disabled><FontAwesomeIcon icon={faTimes}/></Button>}</td>

                                        {/* estuctura para condicion:
                                        {condicion a evaluar ? que pasa si es true : que pasa si es false} */}


                                        
                                </tr>
                            )}
                            <tr>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )
        } else {
            return (
                <Alert variant="danger" style={{ width: '100%', textAlign: 'center' }}>
                    <Alert.Heading>Listado de Ordenes actualmente vacio</Alert.Heading>
                </Alert>
            )
        }
    }

    asignarOrden = () => {
        if (this.state.ordenSeleccionada.idOrden !== null && this.state.usuarioAsignado !== 0) {
            const rutaServicio = "https://megalabs.digitalbroperu.com/servicioasignarorden.php"
            var formData = new FormData();
            formData.append("idOrden", this.state.ordenSeleccionada.idOrden);
            formData.append("asignadoPor", window.usuario.idUsuario);
            formData.append("asignadoA", this.state.usuarioAsignado);
            console.log("orden pre-servicio:", this.state.ordenSeleccionada.idOrden);
            console.log("usuario pre-servicio:", this.state.usuarioAsignado);
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

    seleccionarOrden(itemOrden) {
        //esta logica siguiente es para capturar el item clickeado y luego si se clickea otro, desmarque como "active" el anterior
        if (this.state.ordenSeleccionada !== '') {
            //document.getElementById("li-orden-" + this.state.ordenSeleccionada.idOrden).classList.remove("btn disabled"); //esto hace que se marque el elemento cliqueado como "activo"
            document.getElementById("li-orden-" + this.state.ordenSeleccionada.idOrden).classList.remove("active"); //esto hace que se marque el elemento cliqueado como "activo"
            
        }
        this.setState({ ordenSeleccionada: itemOrden })
        document.getElementById("li-orden-" + itemOrden.idOrden).classList.add("active"); //esto hace que se marque el elemento cliqueado como "activo"
    }

    //(itemOrden.estado == 1) ? {color: 'red'}:{color: 'green'}

    /*switch (itemOrden.estado){
            case '1':
                return {color: '#3acdab'};
            case '2':
                return {color: 'orange'};
            case '3':
                return {color: 'green'};
            default:
                return {color: 'yellow'};
        }*/

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
            fetch(rutaServicio, { method: 'POST', body: formData })
                .then(() => { this.leerOrdenes(); })
        }
    })

    
    anularOrden = (itemOrden => {
        var respuesta = window.confirm("¿Está seguro que desea anular la Orden " + itemOrden.pedidoDeVentas + "?")
        if (respuesta === true) {
            const rutaServicio = "http://megalabs.digitalbroperu.com/servicioanularorden.php"
            var formData = new FormData();
            formData.append("idOrden", itemOrden.idOrden);
            fetch(rutaServicio, { method: 'POST', body: formData })
                .then(() => { this.leerOrdenes(); })
        }
    })


    render() {
        let contenidoTablaOrden = this.dibujarTabla(this.state.listaOrdenes)
        return (
            <section id="orden" className="padded">
                <div className="container-fluid">
                    <div className="row">
                        {contenidoTablaOrden}
                    </div>
                </div>
            </section>
        );
    }

}
export default OrdenVenta;
