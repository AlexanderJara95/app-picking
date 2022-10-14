import {useEffect,useState} from 'react';
import { Breadcrumb } from "react-bootstrap";
import HtmlToJson from '../../utils/HtmlToJson';
import ListadoOrdenes from './components/ListadoOrdenes';
import OrdenVenta from './OrdenVenta';
import OrdenVentaPicker from './OrdenVentaPicker';

const OrdenVentaIndex = ()=> {

    useEffect(()=>{
        
    },[]);

    return (
        <>
            <div className="container-fluid" style={{backgroundColor:'#ffffff'}}>
                <div className="row pt-2">
                    <div className="col m-0 font-weight-bold text-primary pb-2">
                        <h3>Órdenes - Listado de Informes de Picking</h3>
                    </div>
                </div>
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