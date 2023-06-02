import {useEffect,useState} from 'react';
import OrdenVentaHistorial from '../ordenVenta/OrdenVentaHistorial';

const HistorialIndex = ()=> {

    useEffect(()=>{
        
    },[]);

    return (
        <>
            <div className="container-fluid p-3" style={{backgroundColor:'#ffffff'}}>
                <div className="row py-3">
                    <div className="col-8 m-0 font-weight-bold text-primary pb-3" >
                        <h1><strong>Historial de Órdenes</strong></h1>
                        <h3>Listado de Informes de Picking</h3>
                    </div>
                </div>
                {(()=>{
                    <OrdenVentaHistorial></OrdenVentaHistorial>
            })()}
            </div>
        </>
    )

}


export default HistorialIndex;