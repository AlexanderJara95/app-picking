import { useEffect, useState } from "react";
import { Button, Form, FormControl, FormSelect } from "react-bootstrap";
import store from "../../../redux/Store";
import { StatusCodes } from 'http-status-codes';
import { listarUsuarios, registrarUsuario, validarregistrarUsuario } from "../../../redux/usuario/UsuarioActions";
import { toastme } from "toastmejs";

const UsuarioForm = ({accion,id}) =>{
    const [usuario, setUsuario] = useState({});
    const [validated, setValidated] = useState(false);
    const [dataNivelUsuario,setDataNivelUsuario] = useState([
        {
            id:2,
            descripcion:'Admin'
        },
        {
            id:3,
            descripcion:'Picker'
        },
        
    ]  );

    useEffect(()=>{
        if(window.usuario.nivelUsuario=='1'){
            setDataNivelUsuario([
                {
                    id:2,
                    descripcion:'Admin'
                },
                {
                    id:3,
                    descripcion:'Picker'
                },
            ])
        }

        if(window.usuario.nivelUsuario=='2'){
            setDataNivelUsuario([
                {
                    id:3,
                    descripcion:'Picker'
                },
            ])
        }
        if(accion=='editar'){
            listarUsuarioId(id);
        }
        //console.log("windows usuario",window.usuario.nivelUsuario);
        //console.log("dataNivelUsuario",dataNivelUsuario);
    },[]);

    const listarUsuarioId = async(id)=>{
        try {
            /*
            const response = await store.dispatch(registrarUsuario(usuario));
            if (response.status === StatusCodes.OK) {
                console.log("Nuevo Usuario agregado");
                window.location.href = '/usuario';
            }
            */
        } catch (error) {
            //console.log(error);
        }
    }

    const functAccion = async() =>{
        console.log("nuevo usuario",usuario);
        if(usuario.correo.split("@")[1] == 'megalabs.com.pe'){
            if(accion=='nuevo'){
                try {
                    const response = await store.dispatch(validarregistrarUsuario(usuario));
                    if(response.data==0){
                        try {
                            const response = await store.dispatch(registrarUsuario(usuario));
                            if (response.status === StatusCodes.OK) {
                                console.log("Nuevo Usuario agregado");
                                window.location.href = '/usuario';
                            }
                        } catch (error) {
                            //console.log(error);
                        }
                    }else{
                        toastme.error(
                            `Usuario ya registrado`,
                        );
                    }
                } catch (error) {
                    //console.log(error);
                }
            }
            if(accion=='editar'){
                console.log("Nuevo Usuario agregadop");
            }
        }else{
            toastme.error(
                `Ingrese un correo de la empresa`,
            );
        }
    }    

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            console.log("goo");
            setValidated(true);
        }else{
            setValidated(false);
            functAccion();
            event.preventDefault();
            event.stopPropagation();
        }    
    };

    const cambiosEnFormulario = e => {
		const { name, value, checked, type } = e.target;
        console.log("etarget",e.target.name);
        console.log("etarget",e.target.value);
		setUsuario({
			...usuario,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

    return(
        <Form className='col-10 col-sm-6 col-md-4 col-xl-4 d-grid gap-5' noValidate validated={validated} onSubmit={handleSubmit}>
            <select
                className="form-select"
                value={usuario.nivelUsuario??''}
                name="nivelUsuario"
                onChange={cambiosEnFormulario}
                required
                autoFocus
            >
                <option value="">Seleccione</option>
                {dataNivelUsuario.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.descripcion}
                    </option>
                ))}
            </select>
            <FormControl
                type='input'
                name='nombres'
                value={usuario.nombres??''}
                onChange={cambiosEnFormulario}
                placeholder='Nombres'
                required
                autoFocus
            />
            <FormControl
                type='input'
                name='apellidos'
                value={usuario.apellidos??''}
                onChange={cambiosEnFormulario}
                placeholder='Apellidos'
                required
                autoFocus
            />
            <FormControl
                type='email'
                name='correo'
                value={usuario.correo??''}
                onChange={cambiosEnFormulario}
                placeholder='Correo'
                required
                autoFocus
            />
            <FormControl
                type='password'
                name='password'
                value={usuario.password??''}
                onChange={cambiosEnFormulario}
                placeholder='Contraseña'
                required
                autoFocus
            />
            {/* <Form.Check type="checkbox" name='recuerdame' label="Recuerdame" /> */}
            <Button
                variant='primary'
                size='lg'
                className='rounded-pill'
                type="submit"
            >
                Guardar
            </Button>
        </Form>
    );
}
export default UsuarioForm;