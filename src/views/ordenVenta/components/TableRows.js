function TableRows({rowsData, deleteTableRows, handleChange}) {


    return(
        
        rowsData.map((data, index)=>{
            const {ubicacion, pallet, lote, fecha, cantidad}= data;
            return(

                <tr key={index}>
                <td>
               <input type="text" value={ubicacion} onChange={(evnt)=>(handleChange(index, evnt))} name="ubicacion" className="form-control"/>
                </td>
                <td><input type="text" value={pallet}  onChange={(evnt)=>(handleChange(index, evnt))} name="pallet" className="form-control"/> </td>
                <td><input type="text" value={lote}  onChange={(evnt)=>(handleChange(index, evnt))} name="lote" className="form-control"/> </td>
                <td><input type="text" value={fecha}  onChange={(evnt)=>(handleChange(index, evnt))} name="fecha" className="form-control"/> </td>
                <td><input type="text" value={cantidad}  onChange={(evnt)=>(handleChange(index, evnt))} name="cantidad" className="form-control" /> </td>
                <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
            </tr>

        
            )
        })
   
    )
    
}

export default TableRows;