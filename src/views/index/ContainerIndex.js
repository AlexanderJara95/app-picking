import {useEffect, useState,useRef} from 'react';

const ContainerIndex = ()=> {
    const [listadeInformes,setListadeInformes] = useState('');
    const ref = useRef(null);
    const ListaInformePicking = async () => {
        const rutaServicio = await "https://proyectosmegalabs.000webhostapp.com/serviciolistarpedidos.php"
             fetch(rutaServicio)
                 .then(
                     res => res.json(), //indicamos que el objeto devuelto por dicha solicitud al servicio, sera un Json
                     
                 ) .then(
                     (result) => {
                         setListadeInformes(result);
                     }
                 )
    }
    
    useEffect(()=>{
        ListaInformePicking(); 
        actualizarCarpetaArchivos();
        /*const element = ref.current;
        element.addEventListener("change", (event) => {
            let output = document.getElementById("listing");
            for (const file of event.target.files) {
                console.log("file",file);
              let item = document.createElement("li");
              item.textContent = file.webkitRelativePath;
              output.appendChild(item);
            };
        }, false);*/
    },[]);
    
    const actualizarCarpetaArchivos = () =>{

        setTimeout(() => {
            fetch('/docs/ejemplo4.htm',{mode: 'no-cors'}).then(function (response) {
                return response.text();
            }).then(function (html) {
                // Convert the HTML string into a document object
                stripHtml(html);        
            }).catch(function (err) {
                // There was an error
                console.warn('Something went wrong.', err);
            });
          }, 1000);

          setTimeout(() => {
            fetch('/docs/html7.htm',{mode: 'no-cors'}).then(function (response) {
                return response.text();
            }).then(function (html) {
                // Convert the HTML string into a document object
                stripHtml(html);        
            }).catch(function (err) {
                // There was an error
                console.warn('Something went wrong.', err);
            });
          }, 1000);
        
    }

    function stripHtml(html){
        var dateObj = new Date();
        var month = ((dateObj.getMonth() + 1 )<10)?'0'+(dateObj.getMonth() + 1 ):(dateObj.getMonth() + 1 ); //months from 1-12
        var day = dateObj.getDate();
        var year = dateObj.getFullYear();
        // Create a new div element
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        const arrayObtenido = (temporalDivElement.textContent || temporalDivElement.innerText || '').split("\n").filter(x => x!=='');
        const venta_sin_con_fecha = (arrayObtenido[36].slice(0,3)==="PV_")?arrayObtenido[36]:arrayObtenido[37];
        ////console.log(venta_sin_con_fecha);
        const ordenPicking={
            envio:arrayObtenido[21],
            referenciaCliente:arrayObtenido[25],
            codCliente:arrayObtenido[10],
            nomCliente:arrayObtenido[17],
            pedidoVentas:venta_sin_con_fecha,
            detalleOrden:[]
        }
        arrayObtenido.map((item,index)=>{
            if(item.slice(0,1)==="P" && item.slice(3,4)==="N" && item.slice(6,7)==="U" && item.length === 9){
                ordenPicking.detalleOrden.push({
                    ubicacion:arrayObtenido[index],
                    idPallet:arrayObtenido[index+1],
                    codigoArticulo:arrayObtenido[index+2],
                    descripcion:arrayObtenido[index+3],
                    numLote:arrayObtenido[index+4],
                    fechaCaducidad:arrayObtenido[index+5],
                    cantidad:arrayObtenido[index+6],
                });
            }
        });
        ////console.log("ordenPicking",ordenPicking);
        const registrarOrden = "https://proyectosmegalabs.000webhostapp.com/servicioregistrarorden2.php";
        var formData = new FormData();
        //Aca hacemos tantos Append como campos tengamos que pasarle al servicio web para que funcione
        //Esto quiere decir que al formData pasamos el parametro "nombre" 
        //para el servicio web que lo esta esperando, y el contenido es el de la variable "nombreAgregar".
        formData.append("idClienteAx", ordenPicking.codCliente);
        formData.append("nombreCliente", ordenPicking.nomCliente);
        formData.append("referencia", ordenPicking.referenciaCliente);
        formData.append("pedidoDeVentas", ordenPicking.pedidoVentas);
        formData.append("fechaSubida", year+'-'+month+'-'+ day);
        formData.append("estado", 1);
        fetch(registrarOrden,{method: 'POST', body: formData}).then(
            res=>res.text()
        ).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
        });

    }
    
    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            let selected = e.target.files[0];
            let reader = new FileReader();
                reader.addEventListener("loadend", () => {
                    //document.getElementById("demoShowA").innerHTML = reader.result;
                    stripHtml(reader.result);

                    //AgregarInformePicking(json);
                });
            reader.readAsText(selected);            
        }
    };
    
    return (
        <div className="container-fluid">
            <h1 className="col m-0 font-weight-bold text-primary p-3">Subir archivo</h1>
            <div className="row">
                <div className="row">
                    <div className="col">
                        <div className="card shadow mb-4">
                            <div className="card-header py-5">
                                <div className="row container justify-content-center">
                                    <form>
                                        <label htmlFor="upload">(Solo de tipo xlsx)</label>
                                        <div className='col-8'>                                            
                                            <input ref={ref} type="file" directory="Pictures" webkitdirectory="Pictures" multiple/>
                                            <ul id="listing"></ul>
                                        </div>
                                    </form>
                                </div>                                
                            </div>
                            {/*
                               listadeInformes?
                               <div className="card-body">
                                   <h3 className="col m-0 font-weight-bold text-primary p-3">Listado de Informes</h3>
                                   <TableIndex datosTabla={listadeInformes}></TableIndex>                                
                               </div>
                               : 
                               <div className="card-body">
                                   <h3 className="col m-0 font-weight-bold text-primary p-3">No hay Información</h3>                           
                               </div>*/
                            }    
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default ContainerIndex;