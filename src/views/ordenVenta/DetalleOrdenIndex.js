import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import ListadoDetalle from "./components/ListadoDetalle";
import ListadoDetalleAdmin from "./components/ListadoDetalleAdmin";

const DetalleOrdenIndex = () =>{
    const param = useParams();
    const [progress,setProgress] = useState(0);

   
    useEffect(()=>{
        console.log("act");
    },[progress]);
    return(
        <>        
          {/*  <Breadcrumb>
                <Breadcrumb.Item href="/">
                    Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/orden">
                    Órdenes
                </Breadcrumb.Item>
                <Breadcrumb.Item href="#">
                    {(param.id).split("-")[1]}
                </Breadcrumb.Item>
            </Breadcrumb>
            */} 
            <div className="container-fluid" style={{backgroundColor:'#ffffff',position:'sticky',top:'4em',zIndex:'1000'}}>
                <div className="row pt-3">
                    <div className="col m-0 font-weight-bold text-primary pb-3">
                        <h5><strong>Detalle de orden #{(param.id).split("-")[1]}</strong></h5>
                    </div>
                    <div className="col text-primary">
                        <h4><strong>Procentaje de avance</strong></h4>
                        <ProgressBar variant='success' animated now={progress} label={progress.toFixed(2)}></ProgressBar>
                    </div>
                </div>                
            </div>
            
            {window.usuario.nivelUsuario==1||window.usuario.nivelUsuario==3?<ListadoDetalle id={(param.id).split("-")[1]} cod={(param.id).split("-")[0]} setProgress={setProgress} progreso={progress}></ListadoDetalle>:<ListadoDetalleAdmin id={(param.id).split("-")[1]} setProgress={setProgress} progreso={progress}></ListadoDetalleAdmin>}
        </>
    );
}
export default DetalleOrdenIndex;