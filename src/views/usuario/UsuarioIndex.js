import {useEffect,useState} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import ListadoUsuarios from './components/ListadoUsuarios';

const UsuarioIndex = ()=> {
    useEffect(()=>{

    },[]);

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Items>
                    <Breadcrumb.Item href="/">
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Usuarios
                    </Breadcrumb.Item>
                </Breadcrumb.Items>
            </Breadcrumb>
            <div className="container-fluid">
                <div className="col m-0 font-weight-bold text-primary pb-3">
                    <h1><strong>Usuarios</strong></h1>
                    <h3>Listado de Usuarios</h3>
                </div>
            </div>
            <ListadoUsuarios></ListadoUsuarios>
        </>
    )

}


export default UsuarioIndex;