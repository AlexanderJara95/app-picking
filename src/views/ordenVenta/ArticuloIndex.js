import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import ModificarArticulo from "./components/ModificarArticulo";
const ArticuloIndex = ({linkcabecera}) =>{
    const param = useParams();
    useEffect(()=>{
        console.log("listadoDestalle", param.id);
    },[]);
    return(
        <>
            <Breadcrumb>
                <Breadcrumb.Items>
                    <Breadcrumb.Item href="/">
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/orden">
                        Órdenes
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#">
                        Detalle
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#">
                        Artículo
                    </Breadcrumb.Item>
                </Breadcrumb.Items>
            </Breadcrumb>
            <div className="container-fluid" style={{backgroundColor:'#ffffff',position:'sticky',top:'4em'}}>
                <div className="row pt-3">
                    <div className="col m-0 font-weight-bold text-primary pb-3">
                        <h1><strong>Detalle de Orden</strong></h1>
                        <h3>Listado de artículos</h3>
                    </div>
                </div>                
            </div>
        </>
    );
}
export default ArticuloIndex;