import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import ListadoDetalle from "./components/ListadoDetalle";
const DetalleOrdenIndex = () =>{
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
                </Breadcrumb.Items>
            </Breadcrumb>
            <div className="container-fluid">
                <div className="col m-0 font-weight-bold text-primary pb-3">
                    <h1><strong>Detalle de Orden</strong></h1>
                    <h3>Listado de artículos</h3>
                </div>
            </div>
            <ListadoDetalle id={param.id}></ListadoDetalle>
        </>
    );
}
export default DetalleOrdenIndex;