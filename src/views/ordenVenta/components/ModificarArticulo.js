import React, { Component, useEffect, useState } from 'react'
import TableRows from "./TableRows";

function ModificarArticulo({id}) {

    const [rowsData, setRowsData] = useState([]);

    useEffect(()=>{
        
        setRowsData([
            {
                ubicacion: 'a',
                pallet: 'b',
                lote: 'c',
                fecha: 'e',
                cantidad: '3'
            },
            {
                ubicacion: 'e',
                pallet: 'r',
                lote: 't',
                fecha: 'y',
                cantidad: '7'
            },
            {
                ubicacion: 'h',
                pallet: 'j',
                lote: 'k',
                fecha: 'l',
                cantidad: '8'
            },
            {
                ubicacion: 'q',
                pallet: 'w',
                lote: 'r',
                fecha: 'b',
                cantidad: '6'
            }
        ]);
    },[]);

    const addTableRows = () => {

        //crear array constante con los campos a usar para las lineas
        const rowsInput = {
            ubicacion: '',
            pallet: '',
            lote: '',
            fecha: '',
            cantidad: ''
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
        <div className="container">
            <div className="row">
                <div className="col-sm-8">
                    
                <table className="table">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Pedido de Ventas</th>
                            <th>Asignado por</th>
                            <th>Codigo de Articulo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>Dimexa</td>
                        <td>PV_TEST001</td>
                        <td>Diego</td>
                        <td>0001-0001001</td>
                    </tbody>
                </table>
                    <table className="table">
                        <thead>
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
                    </table>
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
