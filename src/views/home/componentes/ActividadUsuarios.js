import { BarList } from "@tremor/react";
import { useEffect, useState } from "react";
import { listarOrdenUsuarios } from "../../../redux/ordenVenta/OrdenVentaActions";
import store from "../../../redux/Store";
import { listarUsuarios } from "../../../redux/usuario/UsuarioActions";

const ActividadUsuarios = () =>{
    const [usuariosOrden, setUsuariosOrden] = useState([]);
    const [usuariosPicker, setUsuariosPicker] = useState({});

    useEffect(()=>{
        if(window.usuario.nivelUsuario==1){
            listaUsuarios();
            //listaOrdenes();
        }
    });

    const listaUsuarios = async () =>{
        try {            
            const response = await store.dispatch(listarOrdenUsuarios());
            filtradoPorEstado(response.listaOrden);
        }catch(error){
            console.log(error);
        }
    }
    const listaUsuariosPicker = async()=>{
        try {
            const response = await store.dispatch(listarUsuarios());
            setUsuariosPicker((response.usuarios).filter(x => x.nivelUsuario=='3'));
        } catch (error) {
            console.log(error);
        }
    }

    const filtradoPorEstado = (array) =>{
        setUsuariosOrden([]);
        const param = array.filter(x =>x.estado=='4'|| x.estado=='3'||x.estado=='2');       
        const groupByCategory = param.reduce((group, product) => {
             const { username } = product;
             group[username] = group[username] ?? [];
             group[username].push(product);
             return group;
        }, {});
        //console.log("dsd",Object.getOwnPropertyNames(groupByCategory));
        Object.getOwnPropertyNames(groupByCategory).forEach((val) => {
        setUsuariosOrden((prev) => [...prev, {
            name: groupByCategory[val][0].username,
            value: groupByCategory[val].length 
        }]);
       });      
     }
 
      return(
        <BarList data={usuariosOrden} marginTop="mt-2" color='emerald' />
      )

}
export default ActividadUsuarios;