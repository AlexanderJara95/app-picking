import { useEffect } from 'react';
import {Table} from 'react-bootstrap';
import SwitchValue from './SwitchValue';

const TableIndex = ({datosTabla}) =>{

  useEffect(()=>{
    if(datosTabla); //console.log("datosTabla",datosTabla);
  },[]);

  return (
    <Table responsive bordered hover>
      <thead style={{backgroundColor: '#3f65d4',color:'#fff',border: '1px solid #3f65d4'}}>
      <tr>
          <th>ALMACÉN</th>
          <th>CÓDIGO ARTÍCULO</th>
          <th>FECHA ENTREGA</th>
          <th>ID LOTE INTERNO</th>
          <th>ID PALLET</th>
          <th>N° LOTE</th>
          <th>RESERVADO</th>
          <th>SELECCIONAR</th>
          <th>SELECCIONAR CANTIDAD</th>
          <th>SUB LOTE CALIDAD</th>
          <th>UBICACIÓN</th>
        </tr>
      </thead>
      <tbody>
        {datosTabla && 
        datosTabla.map((item,index) =>(
          <tr key={index} className="text-center">
              <td>{item?.Almacen}</td>
              <td>{item.Codigodearticulo}</td>
              <td>{item.Fechadeentrega}</td>
              <td>{item.Iddeloteinterno}</td>
              <td>{item.Iddepallet}</td>
              <td>{item.Numerodelote}</td>
              <td><SwitchValue valorSwitch={item?.Reservado}></SwitchValue></td>
              <td>{item.Seleccionar}</td>
              <td>{item.Seleccionarcantidad}</td>
              <td>{item.Sublotedecalidad}</td>
              <td>{item.Ubicacion}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableIndex;