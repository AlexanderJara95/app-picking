const ListaInformePicking = () => {
   const rutaServicio = "https://proyectosmegalabs.000webhostapp.com/serviciolistarpedidos.php"
        fetch(rutaServicio)
            .then(
                res => res.json(), //indicamos que el objeto devuelto por dicha solicitud al servicio, sera un Json
                
            ) .then(
                (result) => {
                    console.log("result",result);
                    return result;
                    //aca se crean las variables globales/ de estado
                }
            )
}
export default ListaInformePicking;
