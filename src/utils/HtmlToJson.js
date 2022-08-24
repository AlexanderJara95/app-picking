const HtmlToJson = (html) => {
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
    console.log(venta_sin_con_fecha);
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
    return ordenPicking;  

}

export default HtmlToJson;