import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEye, faTimes, faWindowRestore } from '@fortawesome/free-solid-svg-icons' //Esto es para importar iconos, se deben mencionar cada icono especifico
import { Table, Button } from 'react-bootstrap';
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

    componentWillReceiveProps(props) {
        console.log(props.detalleOrden)
        this.leerDetalle(props.detalleOrden.idOrden)
    }


    componentDidMount() {
        this.leerUsuarios();
        this.leerOrdenes();
        this.leerEstado();


    }

    componentDidUpdate() {
        // this.leerOrdenes();
    }


    leerOrdenes() {
        const rutaServicio = "https://megalabs.digitalbroperu.com/serviciolistarorden.php"
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

        return (

            <div className="table-responsive container-fluid " id="tabla" role="tabpanel" aria-labelledby="home-tab" >
                <Table className="table-sm border-white" responsive bordered hover striped>
                    <thead className="thead-dark bg-dark text-white">
                        <tr className='align-middle' scope="col">
                            <th scope="col">Id Orden</th>
                            <th scope="col">Pedido de Ventas</th>
                            <th scope="col">Id Cliente AX</th>
                            <th scope="col">Nombre Cliente</th>
                            <th scope="col">Referencia</th>
                            <th scope="col">Asignar</th>
                            <th scope="col">Asignado A</th>
                            <th scope="col">Fecha de Subida</th>
                            <th scope="col">Fecha de Inicio</th>
                            <th scope="col">Fecha Terminado</th>
                            <th scope="col">Estado</th>
                            <th colSpan={3}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody >
                        {datosTabla.map((itemOrden) =>
                            <tr className='align-middle'
                                scope="row"
                                key={itemOrden.idOrden}
                                id={"li-orden-" + itemOrden.idOrden}
                                style={{textAlign: 'center'}}
                                onClick={() => this.seleccionarOrden(itemOrden)} >
                                <td>{itemOrden.idOrden}</td>
                                <td>{itemOrden.pedidoDeVentas}</td>
                                <td>{itemOrden.idClienteAx}</td>
                                <td>{itemOrden.nombreCliente}</td>
                                <td>{itemOrden.referencia}</td>
                                <td style={{ minWidth: '130px' }}>
                                    <select className="form-select form-select-sm mb-3" aria-label=".form-select-lg example">
                                        <option value='0' onClick={this.seleccionarUsuario}>Seleccione</option>
                                        {this.state.listaUsuarios.map((usuario) => (
                                            usuario.nivelUsuario == 3 ? <option key={usuario.idUsuario} value={usuario.idUsuario} onClick={this.seleccionarUsuario} >{usuario.nombre}</option> : null
                                        ))}
                                    </select>
                                </td>
                                <td >{this.state.listaUsuarios.map((usuario) => (
                                    
                                    usuario.idUsuario == itemOrden.asignadoA ? <>{usuario.nombre}</> : null
                                ))}</td>
                                {/*<td>{itemOrden.asignadoA}</td>*/}
                                <td>{itemOrden.fechaSubida}</td>
                                <td>{itemOrden.fechaInicio}</td>
                                <td>{itemOrden.fechaCompletado}</td>
                                <td style={{textAlign: 'center'}}>{this.mostrarEstado(itemOrden.estado)}</td>
                                <td><NavLink to={"/detalleorden/" + itemOrden.pedidoDeVentas}><Button><FontAwesomeIcon icon={faEye} /></Button></NavLink></td>
                                <td><Button className="btn-success" onClick={event => this.activarBoton(event)}><FontAwesomeIcon icon={faCheck} /></Button></td>  {/*onClick={() => this.mostrarEliminar(itemOrden)} */}
                            </tr>
                        )}
                        <tr>

                        </tr>
                    </tbody>
                </Table>
            </div>
        )
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
                return <span style={{backgroundColor:"#ffff00",color:'#000000',borderRadius:'20px',padding:'5px',paddingLeft:'15px',paddingRight:'15px', fontWeight: 'bolder'}}>Por Asignar</span>
            case 'Asignado':
                return <span style={{backgroundColor:"#00ff00",color:'#000000',borderRadius:'20px',padding:'5px',paddingLeft:'15px',paddingRight:'15px', fontWeight: 'bolder'}}>Asignado</span>
            case 'En Proceso':
                return <span style={{backgroundColor:"#00ccff",color:'#ffffff',borderRadius:'20px',padding:'5px',paddingLeft:'15px',paddingRight:'15px', fontWeight: 'bolder'}}>En Proceso</span>
            case 'Atendido':
                return <span style={{backgroundColor:"#ffad46",color:'#ffffff',borderRadius:'20px',padding:'5px',paddingLeft:'25px',paddingRight:'25px', fontWeight: 'bolder'}}>Atendido</span>
            case 'Finalizado':
                return <span style={{backgroundColor:"#00802b",color:'#ffffff',borderRadius:'20px',padding:'5px',paddingLeft:'15px',paddingRight:'15px', fontWeight: 'bolder'}}>Finalizado</span>
            case 'Anulado':
                return <span style={{backgroundColor:"#b30000",color:'#ffffff',borderRadius:'20px',padding:'5px',paddingLeft:'15px',paddingRight:'15px', fontWeight: 'bolder'}}>Anulado</span>

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



    /*<DetalleOrden detalleOrden={this.state.ordenSeleccionada} />*/
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