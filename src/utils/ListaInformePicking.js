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