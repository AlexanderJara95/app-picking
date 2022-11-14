import { faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { BarList } from "@tremor/react";
import { useEffect, useState } from "react";
import { listarOrdenUsuarios } from "../../../redux/ordenVenta/OrdenVentaActions";
import store from "../../../redux/Store";
import { listarUsuarios } from "../../../redux/usuario/UsuarioActions";

const ActividadUsuarios = () =>{
    const [usuariosOrden, setUsuariosOrden] = useState([]);
    const [usuariosPicker, setUsuariosPicker] = useState({});

    useEffect(()=>{
        listaUsuariosPicker();
    },[]);

    useEffect(()=>{
        if(window.usuario.nivelUsuario==1){
            listaUsuarios();
        }
    });

    const listaUsuarios = async () =>{
        try {            
            const response = await store.dispatch(listarOrdenUsuarios());
            setTimeout(()=>{
                filtradoPorEstado(response.listaOrden);
            },[300]);
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
       
     }
 
      return(
        <BarList data={usuariosOrden} marginTop="mt-2" color='emerald' />
      )

}
export default ActividadUsuarios;