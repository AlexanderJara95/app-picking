import {useEffect,useState} from 'react';
import ListadoUsuarios from './components/ListadoUsuarios';
import { Breadcrumb, Button } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

const UsuarioIndex = ()=> {
    useEffect(()=>{

    },[]);

    return (
        <>
            <div className="container-fluid p-3">
                <div className="row py-3">
                    <div className="col-8 m-0 font-weight-bold text-primary pb-3" >
                        <h1><strong>Usuarios</strong></h1>
                        <h3>Listado de Usuarios</h3>
                    </div>
                    <div className="offset-2 col-2" style={{textAlign: "center",alignSelf:"center"}}>
                        <NavLink to={"/usuario/nuevo"} ><Button className="btn-primary">Nuevo +</Button></NavLink>
                    </div>
                </div>                
            </div>
            <ListadoUsuarios></ListadoUsuarios>
        </>
    )

}


export default UsuarioIndex;