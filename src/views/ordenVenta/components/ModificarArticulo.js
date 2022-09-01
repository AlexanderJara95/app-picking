import React, { Component, useEffect, useState } from 'react'
import TableRows from "./TableRows";
import { Table } from 'react-bootstrap';


function ModificarArticulo({articulo,setArticulo}) {

    useEffect(()=>{
      console.log("articulo,",articulo);
      if(Object.keys(articulo).length !== 0){
        setRowsData([...rowsData, {
            idArticulo: articulo.idArticulo,
            pedidoDeVentas: articulo.pedidoDeVentas,
            codigoArticulo: articulo.codigoArticulo,
            descripcion: articulo.descripcion,
            numeroLote: articulo.numeroLote,
            ubicacion: articulo.ubicacion,
            idPallet: articulo.idPallet,
            fechaCaducidad: articulo.fechaCaducidad,
            cantidad: articulo.cantidad
        }]);
      }
    },[articulo]);

    const [rowsData, setRowsData] = useState([]);
    const addTableRows = () => {
        //crear array constante con los campos a usar para las lineas
        console.log("articulo",articulo.ubicacion);
        const rowsInput = {
          idArticulo: articulo.idArticulo,
          pedidoDeVentas: articulo.pedidoDeVentas,
          codigoArticulo: articulo.codigoArticulo,
          descripcion: articulo.descripcion,
          numeroLote: articulo.numeroLote,
          ubicacion: articulo.ubicacion,
          idPallet: articulo.idPallet,
          fechaCaducidad: articulo.fechaCaducidad,
          cantidad: articulo.cantidad
        }
        //con esto usando solo el "rowsInput" es para agregar lineas usando el array constante creado arriba, con la instancia de useState "setRowsData"
        //se agregar el "...rowsData" para que mantengan la linea/data ya ingresada y solo agregue una nueva posterior
        setRowsData([...rowsData, rowsInput])

    }
    //Eliminar lineas ejecutandolo en base al index de la linea clickeada, seleccionando solo la linea indicada, y no todas (por el "...rowsData")
    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }

    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-8">
                  <Table className="table" bordered>
                      <thead className='bg-dark text-white text-center'>
                          <tr>
                              <th>Ubicacion</th>
                              <th>Pallet</th>
                              <th>Lote</th>
                              <th>Fecha Caducidad</th>
                              <th>Cantidad</th>
                              <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th>
                          </tr>
                      </thead>
                      <tbody>
                          <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
                      </tbody>
                  </Table>
                </div>
                <div className="col-sm-4">

                </div>
            </div>
        </div>
    )

}
/*
const [rowsInput, setRowsInput] = useState(initial);


const leerTabla = () => {

}
const initial = {
    email: '',
    nombre: 'asd',
    medidas: {
        altura: '',
        peso: '',
        edad: '',
        tez: ''
    }
}



return (
    <div>{rowsInput.nombre}</div>
)
}
*/ 
/*------------------------------------------------------------------------------*/


/* COMO CLASE */
/*
export class ModificarDetalle extends Component {


    constructor(props) {
        super(props)

        this.state = {
            conteo = '',
            this.setState.conteo = a
        setConteo([])

        const [variale, asignarValor] = useState([]);


            this.state.conteo

        variable

        this.setState.conteo = valor

        asignarValor(valor)
        }
    }

    dijarTbala
    return() {
        asodhodsaf
    }




    asdasdfsafafawha
    sdfohsafda
    asdjhflad



    render() {
        return (
            <div>ModificarDetalle</div>
        )
    }
}

export default ModificarDetalle

*/

export default ModificarArticulo
