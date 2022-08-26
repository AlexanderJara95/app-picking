import { useEffect, useState } from 'react';

const ListadoInformes = () =>{

  const [returnInformes,setReturnInformes] = useState('');

  const listadoDeInformes = () =>{
    const rutaServicio = "https://proyectosmegalabs.000webhostapp.com/serviciolistarpedidos.php"
      fetch(rutaServicio)
        .then(
            res => res.json(), //indicamos que el objeto devuelto por dicha solicitud al servicio, sera un Json
        ) .then(
            (result) => {
                console.log("result",result);
                setReturnInformes(result);
                //aca se crean las variables globales/ de estado
            }
        )
  }
  useEffect(()=>{
    listadoDeInformes();
  },[]);

  useEffect(()=>{
    listadoDeInformes();
  },[returnInformes]);

  return (
    <div className="card-body">
      {
        returnInformes?
          <h3 className="col m-0 font-weight-bold text-primary p-3">Listado de Informes</h3>
          : 
          <h3 className="col m-0 font-weight-bold text-primary p-3">No Hay Info</h3>
      }
    </div>
  );
}

export default ListadoInformes;