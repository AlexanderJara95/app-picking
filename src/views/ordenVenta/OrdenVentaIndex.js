import {useEffect,useState} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import HtmlToJson from '../../utils/HtmlToJson';

const OrdenVentaIndex = ()=> {

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
                    const json = HtmlToJson(reader.result);
                    console.log(json);
                    setListadeInformes(json);
                    //AgregarInformePicking(json);
                });
            reader.readAsText(selected);            
        }
    };
    

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Items>
                    <Breadcrumb.Item>
                        Dashboard
                    </Breadcrumb.Item>
                </Breadcrumb.Items>
            </Breadcrumb>
            <div className="container-fluid">
            <h1 className="col m-0 font-weight-bold text-primary p-3"><strong>Importar</strong><h3>Informes de Picking</h3></h1>

            <div className="row">
                <div className="row">
                    <div className="col">
                        <div className="card shadow mb-4">
                            <div className="card-header py-5">
                                <div className="row container justify-content-center">
                                    <form>
                                        <label htmlFor="upload">(Solo de tipo htm)</label>
                                        <div className='col-8'>                                            
                                            <input type="file" onChange={readUploadFile}/>
                                            <ul id="listing"></ul>
                                        </div>
                                    </form>
                                </div>                                
                            </div>
                            {
                               listadeInformes?
                               <div className="card-body">
                                   <h3 className="col m-0 font-weight-bold text-primary p-3">Pedido de venta:<br></br> <span>{listadeInformes.pedidoVentas}</span></h3>
                                                               
                               </div>
                               : 
                               <div className="card-body">
                                   <h3 className="col m-0 font-weight-bold text-primary p-3">No hay Información</h3>                           
                               </div>
                            }    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default OrdenVentaIndex;