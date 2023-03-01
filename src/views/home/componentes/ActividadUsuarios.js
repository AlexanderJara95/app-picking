import { faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@tremor/react";
import { BarList } from "@tremor/react";
import { useEffect, useState } from "react";
import { listarOrdenUsuarios } from "../../../redux/ordenVenta/OrdenVentaActions";
import store from "../../../redux/Store";
import { listarUsuarioOrdenes, listarUsuarios } from "../../../redux/usuario/UsuarioActions";

const ActividadUsuarios = () =>{
    const [usuariosOrden, setUsuariosOrden] = useState([]);

    useEffect(()=>{
        listaUsuarios();
    });

    const listaUsuarios = async () =>{
        try {            
            const response = await store.dispatch(listarUsuarioOrdenes());
            listaUsuariosOrden(response.data);
        }catch(error){
            console.log(error);
        }
    }
    const listaUsuariosOrden = (array)=>{
        setUsuariosOrden([]);
        array.map((item)=>{
            setUsuariosOrden((prev) => [...prev, {
                name: item.username,
                value: item.ordenes==null?'0':item.ordenes,
           }]);
        });
    }
    /*const listaUsuariosPicker = async()=>{
        try {
            const response = await store.dispatch(listarUsuarios());
            setUsuariosPicker((response.usuarios).filter(x => x.nivelUsuario=='3'));
        } catch (error) {
            console.log(error);
        }
    }/

    const filtradoPorEstado = (array) =>{
        setUsuariosOrden([]);
        var usuarios = [];
        var usuariosOcupados = [];
        if(Object.keys(usuariosPicker).length !== 0){
            usuariosPicker.map((item)=>{
                usuarios.push(item.username);
            });
        }
        const param = array.filter(x =>x.estado=='4'|| x.estado=='3'||x.estado=='2');       
        const groupByCategory = param.reduce((group, product) => {
             const { username } = product;
             group[username] = group[username] ?? [];
             group[username].push(product);
             return group;
        }, {});
        //console.log("dsd",Object.getOwnPropertyNames(groupByCategory));
        Object.getOwnPropertyNames(groupByCategory).forEach((val) => {
            usuariosOcupados.push(groupByCategory[val][0].username);
            setUsuariosOrden((prev) => [...prev, {
                name: groupByCategory[val][0].username,
                value: groupByCategory[val].length,
                icon: faUserCircle
            }]);
            
       });      
       const usuariosLibres = usuarios.filter((word) => !usuariosOcupados.includes(word));
       usuariosLibres.map((item)=>{
            setUsuariosOrden((prev) => [...prev, {
                name: item,
                value: '0',
                icon: faUserCircle
           }]);
       });
       
     }*/
 
      return(
        <BarList data={usuariosOrden} marginTop="mt-2" color='emerald' />
      )

}
export default ActividadUsuarios;