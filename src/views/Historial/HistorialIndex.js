import {useEffect,useState} from 'react';
import OrdenVentaHistorial from '../ordenVenta/OrdenVentaHistorial';
import RefreshButton from '../layouts/partials/RefreshButton';

const HistorialIndex = ()=> {

    useEffect(()=>{
        
    },[]);

    return (
        <>
            <div className="container-fluid pt-3" style={{backgroundColor:'#ffffff'}}>
                <div className="row">
                    <div className="col m-0 font-weight-bold text-primary text-center" >
                        <h1><strong>Historial de Órdenes</strong></h1>
                        <h3>Listado de Informes de Picking</h3>
                    </div>
                </div>
                <RefreshButton></RefreshButton>
                <OrdenVentaHistorial></OrdenVentaHistorial>
            </div>
        </>
    )

}


export default HistorialIndex;