import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import ListadoDetalle from "./components/ListadoDetalle";
const DetalleOrdenIndex = () =>{
    const param = useParams();
    const [progress,setProgress] = useState(0);
    useEffect(()=>{
        console.log("listadoDestalle", param.id);
    },[]);
    useEffect(()=>{
        console.log("act");
    },[progress]);
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
            <div className="container-fluid" style={{backgroundColor:'#ffffff',position:'sticky',top:'4em'}}>
                <div className="row pt-3">
                    <div className="col m-0 font-weight-bold text-primary pb-3">
                        <h1><strong>Detalle de Orden</strong></h1>
                        <h3>Listado de artículos</h3>
                    </div>
                    <div className="col text-primary">
                        <h2><strong>Procentaje de avance</strong></h2>
                        <ProgressBar variant='success' animated now={progress} label={progress.toFixed(2)}></ProgressBar>
                    </div>
                </div>                
            </div>
            <ListadoDetalle id={param.id} setProgress={setProgress} progreso={progress}></ListadoDetalle>
        </>
    );
}
export default DetalleOrdenIndex;