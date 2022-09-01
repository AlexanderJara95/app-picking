import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import ModificarArticulo from "./components/ModificarArticulo";
import store from "../../redux/Store";
import { listarArticuloPorId } from '../../redux/ordenVenta/OrdenVentaActions';
import { StatusCodes } from 'http-status-codes';

const ArticuloIndex = () =>{
    const param = useParams();
    const [articulo,setArticulo] =useState({});

    useEffect(()=>{
        if(param.id)busquedaArticulo(param.id);  
    },[param.id]);
      
    const busquedaArticulo= async(id)=>{
        try {
            const response = await store.dispatch(listarArticuloPorId(id));
            console.log("articuloinfo",response.detalleArticulo);
  
            if (response.status === StatusCodes.OK) {	
                setArticulo(response.detalleArticulo);
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                    <Breadcrumb.Item href={"/detalleorden/"+articulo.pedidoDeVentas}>
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
                        <h1><strong>Modificación de Artículos</strong></h1>
                        <h3>{articulo.descripcion}</h3>
                    </div>
                </div>                
            </div>
            <ModificarArticulo articulo={articulo} setArticulo={setArticulo}></ModificarArticulo>
        </>
    );
}
export default ArticuloIndex;