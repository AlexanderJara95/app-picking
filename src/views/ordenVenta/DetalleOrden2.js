import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTimes, faWindowRestore } from '@fortawesome/free-solid-svg-icons' //Esto es para importar iconos, se deben mencionar cada icono especifico
import OrdenVentaIndex from './OrdenVentaIndex';
import ProgressBar from 'react-bootstrap/ProgressBar'

class DetalleOrden2 extends Component {

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
    if(props.detalleOrden.idOrden > 0 ){
    this.leerDetalle(props.detalleOrden.idOrden)
  }
  }

  leerDetalle(idOrden) {
    const rutaServicio = "https://megalabs.digitalbroperu.com/servicioconsultardetalleorden.php"

    var formData = new FormData();
    formData.append("CodOrden", idOrden)
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
              <th>Cliente</th>
              <th>Pedido de Ventas</th>
              <th>Asignado por</th>
              <th>Id Lote Interno</th>
              <th>Codigo Articulo</th>
              <th>N° Lote</th>
              <th>Ubicacion</th>
              <th>Id de Pallet</th>
              <th>Sublote Calidad</th>
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
                {/*<td>{itemDetalle.idDetalleOrden}</td>*/}
                <td>{itemDetalle.nombreCliente}</td>
                <td>{itemDetalle.pedidoVentas}</td>
                <td>{itemDetalle.asignadoPor}</td>
                {/*<td>{itemDetalle.asignadoA}</td>*/}
                {/*<td>{itemDetalle.Seleccionar}</td>*/}
                <td>{itemDetalle.Iddeloteinterno}</td>
                <td>{itemDetalle.Codigodearticulo}</td>
                {/*<td>{itemDetalle.Almacen}</td>*/}
                <td>{itemDetalle.Numerodelote}</td>
                <td>{itemDetalle.Ubicacion}</td>
                <td>{itemDetalle.Iddepallet}</td>
                <td>{itemDetalle.Sublotedecalidad}</td>
                {/*<td>{itemDetalle.CantidadCWdeseleccion}</td>*/}
                <td>{itemDetalle.Seleccionarcantidad}</td>
                {/*<td>{itemDetalle.Reservado}</td>*/}
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

export default DetalleOrden2