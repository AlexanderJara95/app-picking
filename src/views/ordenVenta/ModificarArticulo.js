import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faEdit, faPlus, faTimes, faWindowRestore } from '@fortawesome/free-solid-svg-icons' //Esto es para importar iconos, se deben mencionar cada icono especifico
import DetalleOrden from './DetalleOrden';
import './DetalleOrden.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Button, Table } from 'react-bootstrap';

class ModificarArticulo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listaArticulo: [],
      articuloSeleccionado: '',
      progreso: 0,
      checked: false,
      count: 0,
    }
  }


  componentWillReceiveProps(props) {
    if (props.detalleArticulo.idOrden > 0) {
      this.leerArticulo(props.detalleArticulo.idArticulo)
    }
  }


  componentDidUpdate(props) {

  }

  leerArticulo(idArticulo) {
    const rutaServicio = "https://megalabs.digitalbroperu.com/servicioconsultardetallearticulo.php"

    var formData = new FormData();
    formData.append("idArticulo", idArticulo)
    fetch(rutaServicio, { method: 'POST', body: formData })
      .then(res => res.json())
      .then((result) => {
        this.setState({ count: result.length })
        this.setState({ listaArticulo: result })
      })
  }

  cambiarProgreso = (e) => {
    const checked = e.target.checked;
    if (checked) {
      this.setState({ progreso: this.state.progreso + 100 / this.state.count });
      //console.log("marcado ", this.state.progreso + 1);

    }

    else {
      this.setState({ progreso: this.state.progreso - 100 / this.state.count })
      //console.log("desmarcado ", this.state.progreso - 1);

    }
  };

  limpiarDetalle() {
    this.setState({ progreso: 0 });
    this.setState({ count: 0 });
  }

  dibujarTabla(datosTabla) {
    return (
      <div className="table-responsive table-bordered container-fluid" id="tabla" role="tabpanel" aria-labelledby="home-tab">
        <Table className="table">
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
              <th colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
            {datosTabla.map((itemArticulo, index) =>
              <tr key={index}>
                <td>{itemArticulo.idArticulo}</td>
                <td>{itemArticulo.pedidoDeVentas}</td>
                <td>{itemArticulo.codigoArticulo}</td>
                <td>{itemArticulo.descripcion}</td>
                <td>{itemArticulo.numeroLote}</td>
                <td>{itemArticulo.ubicacion}</td>
                <td>{itemArticulo.idPallet}</td>
                <td>{itemArticulo.fechaCaducidad}</td>
                <td>{itemArticulo.cantidad}</td>
                <td>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="checkdetalle" onChange={(e) => { this.cambiarProgreso(e) }} />
                  </div>
                </td>
                <td><Button onClick={() => this.mostrarActualizar(itemArticulo)} ><FontAwesomeIcon icon={faCirclePlus} /></Button></td>
                <td><FontAwesomeIcon icon={faTimes}
                  onClick={() => this.mostrarEliminar(itemArticulo)} /></td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }


  mostrarTodo() {
    let contenidoDetalleArticulo = this.dibujarTabla(this.state.listaArticulo)
    //let contenidoFormularioActualizar = this.dibujarFormularioActualizar();
    let progreso = <ProgressBar animated now={this.state.progreso} label={`${this.state.progreso.toFixed(2)}%`} />
    return (
      <div>
        <h2>Detalle de Orden</h2>
        <div className="container-fluid">
          <div className="">
            {/*{progreso}*/}
          </div>

        </div>
        {/*{contenidoFormularioActualizar}*/}
        {contenidoDetalleArticulo}
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

export default ModificarArticulo