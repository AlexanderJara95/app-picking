import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { toastme } from 'toastmejs';
import { StatusCodes } from 'http-status-codes';
import store from '../../redux/Store';
import { solicitarAcceso } from '../../redux/auth/AuthActions';
import { guardarAutorizacion } from '../../config/LocalStorageService';
import { showPreloader, hidePreloader } from '../../utils/PreloaderHelper';

const Login = () => {
	const [credencial, setCredencial] = useState({ username: '', password: '' });

	const cambiosEnFormulario = e => {
		const { name, value, checked, type } = e.target;

		setCredencial({
			...credencial,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const iniciarSesion = async e => {
		try {
			e.preventDefault();

			showPreloader();
			const response = await store.dispatch(solicitarAcceso(credencial));

			console.log(response);

			if (response.status === StatusCodes.OK) {
				toastme.success(
					`Bienvenido al sistema ${response.usuario.persona.nombre}`,
				);
				guardarAutorizacion(response.usuario);

				window.location.href = '/';
			}

			hidePreloader();
		} catch (error) {
			hidePreloader();
			console.log(error);
		}
	};

	return (
        <div className='row d-flex justify-content-center'>
            <Form className='col-4 d-grid gap-5'>
                <FormControl
                    type='email'
                    name='usuario'
                    value={credencial.usuario}
                    onChange={cambiosEnFormulario}
                    placeholder='Correo electrónico'
                    autoComplete='email'
                    required
                    autoFocus
                />

                <FormControl
                    type='password'
                    name='clave'
                    value={credencial.clave}
                    onChange={cambiosEnFormulario}
                    placeholder='Contraseña'
                    required
                />

                {/* <Form.Check type="checkbox" name='recuerdame' label="Recuerdame" /> */}

                <Button
                    variant='primary'
                    onClick={iniciarSesion}
                    size='lg'
                    className='rounded-pill'
                >
                    Acceder
                </Button>

                {/* <NavLink to="/sendresetlink" className="text-center">
                <FontAwesomeIcon icon="fa-solid fa-lock" className='me-1' />
                ¿Olvidaste tu contraseña?
            </NavLink> */}
                <a href='#' className='text-center'>
                    <i className='me-1 bx bxs-lock-alt'></i>
                    ¿Olvidaste tu contraseña?
                </a>
            </Form>
        </div>
	);
};

export default Login;