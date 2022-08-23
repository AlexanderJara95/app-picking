import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const SendResetLink = () => (
	<>
		<p className='text-muted text-center mb-5 px-md-4'>
			¡Ingrese su correo electrónico y le enviaremos las instrucciones!{' '}
		</p>

		<Form className='form-material d-grid gap-5'>
			<FormControl
				type='email'
				placeholder='Correo electrónico'
				autoComplete='email'
				required
				autoFocus
			/>

			<Button variant='primary' size='lg' className='rounded-pill'>
				Enviar
			</Button>

			<NavLink to='/login' className='text-center'>
				<FontAwesomeIcon icon='fa-solid fa-user' className='me-1' />
				¿Ya tienes una cuenta?
			</NavLink>
		</Form>
	</>
);

export default SendResetLink;