import {useEffect,useState} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import HtmlToJson from '../../utils/HtmlToJson';
import { registrarOrden,registrarOrdenDetalle } from '../../redux/ordenVenta/OrdenVentaActions';
import store from '../../redux/Store';
import { StatusCodes } from 'http-status-codes';
import { toastme } from 'toastmejs';

const InformeIndex = ()=> {

    const [listadeInformes,setListadeInformes] = useState('');
    
    useEffect(()=>{
    },[]);
    
    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            let selected = e.target.files[0];
            let reader = new FileReader();
                reader.addEventListener("loadend", () => {
                    //document.getElementById("demoShowA").innerHTML = reader.result;
                    var json = HtmlToJson(reader.result);
                    registrarOrdenPicking(json);
                });
            reader.readAsText(selected);            
        }
    };

    const registrarOrdenPicking = async(json) =>{
        //validando que exista detalle de orden
        console.log("ddd",json);
        if(json.detalleOrden.length > 0){
            try {
                const response = await store.dispatch(registrarOrden(json));
                console.log("user",response);
                if (response.status === StatusCodes.OK) {
                    toastme.success(
                        `Nuevo Informe registrado`,
                    );		
                    setListadeInformes([...listadeInformes,json.pedidoVentas])
                }
                json.detalleOrden.map(async(item)=>{
                    try {
                        const response = await store.dispatch(registrarOrdenDetalle({
                            pedidoDeVentas: json.pedidoVentas??'',
                            codigoArticulo: item.codigoArticulo??'',
                            descripcion: item.descripcion??'',
                            numeroLote: item.numLote??'',
                            ubicacion: item.ubicacion??'',
                            idPallet: item.idPallet??'',
                            fechaCaducidad: item.fechaCaducidad??'',
                            cantidad: item.cantidad??'',
                        }));
                        if (response.status === StatusCodes.OK) {
                            toastme.success(
                                `Artículo agregado al Detalle`,
                            );		
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });
                
            } catch (error) {
                toastme.error(
                    error
                );
            }
        }else{
            toastme.error(
                `No hay Detalle de orden`
            );
        }
        
    }
    

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Items>
                    <Breadcrumb.Item href="/">
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Importar Informes
                    </Breadcrumb.Item>
                </Breadcrumb.Items>
            </Breadcrumb>
            <div className="container-fluid">
            <div className="col m-0 font-weight-bold text-primary pb-3">
                <h1><strong>Importar</strong></h1>
                <h3>Informes de Picking</h3>
            </div>
            <div className="row">
                <div className="row">
                    <div className="col">
                        <div className="card shadow mb-4">
                            <div className="card-header py-5">
                                <div className="row container justify-content-center">
                                    <form>
                                        <label htmlFor="upload">(Solo de tipo htm)</label>
                                        <div className='col-8'>                                            
                                            <input type="file" onChange={readUploadFile} accept=".htm,.html"/>
                                            <ul id="listing"></ul>
                                        </div>
                                    </form>
                                </div>                                
                            </div>
                            {
                               listadeInformes?
                               <div className="card-body">
                                   <div className="col m-0 font-weight-bold text-primary p-3">
                                        <h3><strong>Pedidos Ingresados:</strong></h3>
                                        {
                                            listadeInformes && 
                                            listadeInformes.map((item,index) =>(
                                                <h4 key={index}>{item}</h4>                                                      
                                            ))
                                        }                                        
                                   </div>                 
                               </div>
                               : 
                               null
                            }    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default InformeIndex;