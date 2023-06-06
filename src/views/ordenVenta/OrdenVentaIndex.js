import {useEffect,useState} from 'react';
import OrdenVenta from './OrdenVenta';
import OrdenVentaPicker from './OrdenVentaPicker';
import RefreshButton from '../layouts/partials/RefreshButton';

const OrdenVentaIndex = ()=> {

    useEffect(()=>{
        
    },[]);

    return (
        <>
            <div className="container-fluid p-3" style={{backgroundColor:'#ffffff'}}>
                <div className="row py-3">
                    <div className="col-8 m-0 font-weight-bold text-primary pb-3" >
                        <h1><strong>Órdenes</strong></h1>
                        <h3>Listado de Informes de Picking</h3>
                    </div>
                </div>
                <RefreshButton></RefreshButton>
                {(()=>{
                //console.log("window.usuario.nivelUsuario",window.usuario.nivelUsuario);
                switch(window.usuario.nivelUsuario){
                    case '1':
                    return (<OrdenVenta></OrdenVenta>);
                    case '2':
                    return (<OrdenVenta></OrdenVenta>);
                    case '3':
                    return (<OrdenVentaPicker></OrdenVentaPicker>);
                };
            })()}
            </div>
        </>
    )

}


export default OrdenVentaIndex;