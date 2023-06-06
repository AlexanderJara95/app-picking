import { BarList } from "@tremor/react";
import { useEffect, useState } from "react";
import { listarOrden } from "../../../redux/ordenVenta/OrdenVentaActions";
import store from "../../../redux/Store";

const EstadoOrdenes =()=>{

    const [ordenesEstado, setOrdenesEstado] = useState([]);

    useEffect(()=>{
        listaOrdenes();
    },[]);

    const listaOrdenes = async () =>{
        try {
            const response = await store.dispatch(listarOrden());
            filtradoPorEstadodeOrden(response.listaOrden);
            //setUsuariosOrden();
        }catch(error){

        }
    }
    
    const estadoOrdenTexto = (num) =>{
        switch (num) {
            case '1':
                return 'Pendiente';
            case '2':
                return 'Asignado';
            case '3':
                return 'En Curso';
            case '4':
                return 'Atendido';
            case '5':
                return 'Finalizado';
            case '6':
                return 'Anulado';
        }
    }
    const filtradoPorEstadodeOrden = (array) =>{
        setOrdenesEstado([]);
        //const param = array.filter(x =>x.estado=='4'|| x.estado=='3'||x.estado=='2');       
        const groupByCategory = array.reduce((group, product) => {
             const { estado } = product;
             group[estado] = group[estado] ?? [];
             group[estado].push(product);
             return group;
        }, {});
         //console.log("dsd",Object.getOwnPropertyNames(groupByCategory));
         Object.getOwnPropertyNames(groupByCategory).forEach((val) => {
         setOrdenesEstado((prev) => [...prev, {
              name: estadoOrdenTexto(groupByCategory[val][0].estado),
              value: groupByCategory[val].length 
         }]);
       });      
     }
     return(
        <BarList data={ordenesEstado} marginTop="mt-2" color='yellow' />
     )
}
export default EstadoOrdenes;