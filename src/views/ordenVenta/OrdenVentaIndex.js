import {useEffect,useState} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import HtmlToJson from '../../utils/HtmlToJson';
import ListadoOrdenes from './components/ListadoOrdenes';
import OrdenVenta from './OrdenVenta';

const OrdenVentaIndex = ()=> {

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
                        Órdenes
                    </Breadcrumb.Item>
                </Breadcrumb.Items>
            </Breadcrumb>
            <div className="container-fluid" style={{backgroundColor:'#ffffff',position:'sticky',top:'4em',zIndex:'1000'}}>
                <div className="row pt-3">
                    <div className="col m-0 font-weight-bold text-primary pb-3">
                        <h1><strong>Órdenes</strong></h1>
                        <h3>Listado de Informes de Picking</h3>
                    </div>
                </div>
            </div>
            <OrdenVenta></OrdenVenta>
        </>
    )

}


export default OrdenVentaIndex;