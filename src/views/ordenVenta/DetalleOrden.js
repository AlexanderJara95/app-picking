import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTimes, faWindowRestore } from '@fortawesome/free-solid-svg-icons' //Esto es para importar iconos, se deben mencionar cada icono especifico
import OrdenVenta from './OrdenVenta';
import ProgressBar from 'react-bootstrap/ProgressBar'

class DetalleOrden extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listaDetalle: [],
      ordenSeleccionada: '',
      progreso: 0,
      checked: false
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
        //console.log(result);
        this.setState({ listaDetalle: result, progreso: 0 })
      })
  }

  cambiarProgreso = (e) => {
    const checked = e.target.checked;
    if (checked) {
      this.setState({ progreso: this.state.progreso + 1 });
      //console.log("marcado ", this.state.progreso + 1);

    }

    else {
      this.setState({ progreso: this.state.progreso - 1 })
      //console.log("desmarcado ", this.state.progreso - 1);

    }
  };


  dibujarTabla(datosTabla) {
    return (
      <div className="table-responsive table-bordered container-fluid" id="tabla" role="tabpanel" aria-labelledby="home-tab">
        <table className="table">
          <thead className="thead-dark">
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
                <td><FontAwesomeIcon icon={faEdit}
                  onClick={() => this.mostrarActualizar(itemDetalle)} /></td>
                <td><FontAwesomeIcon icon={faTimes}
                  onClick={() => this.mostrarEliminar(itemDetalle)} /></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }


  render() {
    let contenidoDetalleOrden = this.dibujarTabla(this.state.listaDetalle)
    //let contenidoFormularioActualizar = this.dibujarFormularioActualizar();
    return (
      <section className="container-fluid" id="detalleorden" >
        <div className="container-fluid" >
          <h2>Detalle de Orden</h2>
          <div className="container-fluid">
            <div className="progress">
              <div id="progressbar" className="progress-bar" role="progressbar" aria-label="Basic example" aria-valuenow="20"   aria-valuemin="0" aria-valuemax="100"></div>
            </div>

          </div>
          {/*{contenidoFormularioActualizar}*/}
          {contenidoDetalleOrden}


        </div>
      </section>
    )
  }
}

export default DetalleOrden