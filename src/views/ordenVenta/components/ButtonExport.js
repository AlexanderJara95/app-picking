import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel} from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from "../../../config/Services";
import * as XLSX from 'xlsx';

const ButtonExport = () =>{
    const [listaOrdenes, setListaOrdenes] = useState([]);
    useEffect(()=>{
        leerOrdenes();
    },[]);
      
    const leerOrdenes = () => {
        const rutaServicio = API_BASE_URL + 'serviciolistarordenHistorialReporte.php';
        fetch(rutaServicio)
          .then((res) => res.json())
          .then((result) => {
            setListaOrdenes(result);
          });
    };

    const exportToExcel = () =>{
        const data = listaOrdenes.map((orden) => ({
            "Envío": orden.envio,
            "Pedido Ventas": orden.pedidoVentas,
            "Nombre Cliente": orden.nombreCliente,
            "Referencia": orden.referencia,
            "Estado": orden.estado,//estadoActual(orden.estado),            
            "Asignado por": orden.asignadoPorNombre,
            "Asignado a": orden.asignadoANombre +' ('+orden.asignadoAUsuario+')',
            "Fecha Inicio": orden.fechaInicio,
            "Fecha Término": orden.fechaCompletado,
            "Avance": orden.avance
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Órdenes");

        // Guardar el archivo Excel
        XLSX.writeFile(workbook, "reporte-ordenes.xlsx");
    };

    /*const estadoActual = (estado) =>{
        return;
    };*/

    return(
        <>
            <button onClick={exportToExcel} className="btn btn-success">
                Todas las órdenes &nbsp;&nbsp;<FontAwesomeIcon icon={faFileExcel} style={{ display: 'inline-block', marginRight: '5px' }}/>
            </button>
        </>
    );
}
export default ButtonExport;