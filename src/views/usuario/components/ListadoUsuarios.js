import { useEffect, useState } from 'react';
import { listarUsuarios } from '../../../redux/usuario/UsuarioActions';
import store from '../../../redux/Store';
import { StatusCodes } from 'http-status-codes';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faEye, faTimes, faWindowRestore } from '@fortawesome/free-solid-svg-icons' //Esto es para importar iconos, se deben mencionar cada icono especifico
import NivelUsuario from './NivelUsuario';

const ListadoUsuarios = () =>{

    const [datosTabla,setDatosTabla] = useState([]);
    const [ordenSeleccionada,setOrdenSeleccionada] = useState({});
    useEffect(()=>{
        listaUsuarioServicio();        
    },[]);

    const listaUsuarioServicio= async()=>{
        try {
            const response = await store.dispatch(listarUsuarios());

            if (response.status === StatusCodes.OK) {	
                setDatosTabla(response.usuarios);
            }
        } catch (error) {
            //console.log(error);
        }
    }
    const seleccionarOrden=(itemOrden)=>{
        setOrdenSeleccionada(itemOrden);
        document.getElementById("li-orden-" + itemOrden.idOrden).classList.add("active"); //esto hace que se marque el elemento cliqueado como "activo"   
        if (Object.keys(ordenSeleccionada).length !== 0) {
            document.getElementById("li-orden-" + ordenSeleccionada.idOrden).classList.remove("active"); //esto hace que se marque el elemento cliqueado como "activo"
        }            
    }


    return(
        <div className="table-responsive table-bordered" id="tabla" role="tabpanel" aria-labelledby="home-tab" >
            <Table id="tabla" className="table table-hover" >
                <thead id="thead" className="table thead-dark bg-dark text-white">
                    <tr>
                        <th>Código Usuario</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Correo</th>
                        <th>Username</th>
                        <th>Tipo</th>
                        <th colSpan={2}>Acciones</th>
                    </tr>
                </thead>
                <tbody >
                    {datosTabla.map((itemUsuario) =>
                        <tr key={itemUsuario.idUsuario}
                            id={"li-usuario-" + itemUsuario.idUsuario}
                            onClick={() => this.seleccionarOrden(itemUsuario)}>
                            <td>{itemUsuario.idUsuario}</td>
                            <td>{itemUsuario.nombre}</td>
                            <td>{itemUsuario.apellido}</td>
                            <td>{itemUsuario.correo}</td>
                            <td>{itemUsuario.username}</td>
                            <td><NivelUsuario nivel={itemUsuario.nivelUsuario}></NivelUsuario></td>
                            <td><i className='bx bx-edit'data-bs-toggle="modal" data-bs-target="#exampleModalCenter" /> </td>
                            <td><FontAwesomeIcon icon={faCheck} onClick={() => this.mostrarEliminar(itemUsuario)} /></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
        )
}
export default ListadoUsuarios;