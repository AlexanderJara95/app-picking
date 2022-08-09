import * as xlsx from 'xlsx/xlsx.mjs';
import {useState} from 'react';
import TableIndex from './TableIndex';

function ContainerIndex() {
    
    const initialInfoExcel={
        Almacen: "",
        Codigodearticulo: "",
        Fechadeentrega: "",
        Iddeloteinterno: "",
        Iddepallet: "",
        Numerodelote: "",
        Reservado: "",
        Seleccionar: "",
        Seleccionarcantidad: "",
        Sublotedecalidad: "",
        Ubicacion: "",
    }
    const [infoExcel,setInfoExcel] = useState();

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log("ingresando");
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json= xlsx.utils.sheet_to_json(worksheet);
                console.log(json,"json");
                setInfoExcel(json);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    };
    
    return (
        <div className="container-fluid">
            <h1 className="col m-0 font-weight-bold text-primary p-3">Sube tu archivo</h1>
            <div className="row">
                <div className="row">
                    <div className="col">
                        <div className="card shadow mb-4">
                            <div className="card-header py-5">
                                <div className="row container justify-content-center">
                                    <form>
                                        <label htmlFor="upload">(Solo de tipo xlsx)</label>
                                        <input
                                            className='col form-control'
                                            type="file"
                                            name="upload"
                                            id="upload"
                                            onChange={readUploadFile}
                                        />
                                    </form>
                                </div>                                
                            </div>
                            {
                                infoExcel?
                                    <div className="card-body">
                                        <h3 className="col m-0 font-weight-bold text-primary p-3">Previsualización</h3>
                                        <TableIndex datosTabla={infoExcel}></TableIndex>                                
                                    </div>
                                :null
                             }
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default ContainerIndex;