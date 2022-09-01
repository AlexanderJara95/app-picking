function TableRows({rowsData, deleteTableRows, handleChange}) {


    return(
        
        rowsData.map((data, index)=>{
            const {idArticulo,pedidoDeVentas,codigoArticulo,descripcion,numeroLote,ubicacion,idPallet,fechaCaducidad,cantidad}= data;
            return(

                <tr key={index}>
                <td>
               <input type="text" value={ubicacion} onChange={(evnt)=>(handleChange(index, evnt))} name="ubicacion" className="form-control"/>
                </td>
                <td><input type="text" value={idPallet}  onChange={(evnt)=>(handleChange(index, evnt))} name="idPallet" className="form-control"/> </td>
                <td><input type="text" value={numeroLote}  onChange={(evnt)=>(handleChange(index, evnt))} name="numeroLote" className="form-control"/> </td>
                <td><input type="text" value={fechaCaducidad}  onChange={(evnt)=>(handleChange(index, evnt))} name="fechaCaducidad" className="form-control"/> </td>
                <td><input type="text" value={cantidad}  onChange={(evnt)=>(handleChange(index, evnt))} name="cantidad" className="form-control" /> </td>
                <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
            </tr>

        
            )
        })
   
    )
    
}

export default TableRows;