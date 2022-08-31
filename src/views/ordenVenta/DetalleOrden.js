import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCirclePlus, faEdit, faTimes, faWindowRestore } from '@fortawesome/free-solid-svg-icons' //Esto es para importar iconos, se deben mencionar cada icono especifico
import OrdenVenta from './OrdenVenta';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Table, Button  } from 'react-bootstrap';

class DetalleOrden extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listaDetalle: [],
      ordenSeleccionada: '',
      progreso: 0,
      checked: false,
      count:0,
    }
  }


  /*componentWillReceiveProps(props) {
    //console.log(props.detalleOrden)
    this.leerDetalle(props.detalleOrden.idOrden)
  }
  */

  
  
  componentDidUpdate(props){
    //console.log(props.detalleOrden.idOrden, "antes del if");

    if(props.detalleOrden.idOrden > 0 ){
    this.leerDetalle(props.detalleOrden.pedidoDeVentas)
    //console.log(props.detalleOrden.idOrden, "despues del if")
  }

  }

  leerDetalle(pedidoDeVentas) {
    const rutaServicio = "https://megalabs.digitalbroperu.com/servicioconsultardetalleorden.php"

    var formData = new FormData();
    formData.append("pedidoDeVentas", pedidoDeVentas)
    fetch(rutaServicio, { method: 'POST', body: formData })
      .then(res => res.json())
      .then((result) => {
        this.setState({ count: result.length})
        this.setState({ listaDetalle: result})
      })
  }

  cambiarProgreso = (e) => {
    const checked = e.target.checked;
    if (checked) {
      this.setState({ progreso: this.state.progreso + 100/ this.state.count });
      //console.log("marcado ", this.state.progreso + 1);

    }

    else {
      this.setState({ progreso: this.state.progreso - 100/ this.state.count  })
      //console.log("desmarcado ", this.state.progreso - 1);

    }
  };


  limpiarDetalle(){
    this.setState({progreso: 0});
    this.setState({count: 0});
  }
  
  dibujarTabla(datosTabla) {
    return (
      <div className="table-responsive table-bordered container-fluid" id="tabla" role="tabpanel" aria-labelledby="home-tab">
        <Table className="table" responsive bordered hover>
          <thead className="thead-dark" >
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
                    <input className="form-check-input" type="checkbox" id="checkdetalle" onChange={(e) => { this.cambiarProgreso(e) }} />
                  </div>
                </td>
                <td><Button onClick={() => this.mostrarActualizar(itemDetalle)} ><FontAwesomeIcon icon={faCirclePlus} /></Button></td>
                <td><Button onClick={() => this.mostrarEliminar(itemDetalle)}> <FontAwesomeIcon icon={faTimes}   /></Button></td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }


  

  mostrarTodo(){
    let contenidoDetalleOrden = this.dibujarTabla(this.state.listaDetalle)
    //let contenidoFormularioActualizar = this.dibujarFormularioActualizar();
    let progreso = <ProgressBar animated now={this.state.progreso} label={`${this.state.progreso.toFixed(2)}%`} />
    return(
      <div>
      <div className="container-fluid">
        <div className="">
          {progreso}
        </div>

      </div>
      {/*{contenidoFormularioActualizar}*/}
      {contenidoDetalleOrden}
      </div>
    )
  }


  render() {

    return (
      <section className="container-fluid" id="detalleorden" >
        <div className="container-fluid" >

          {this.mostrarTodo()}

        </div>
      </section>
    )
  }
}

export default DetalleOrden;