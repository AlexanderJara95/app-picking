import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const PasswordReset = () => (
	<Form className='form-material d-grid gap-5'>
		<FormControl
			type='email'
			placeholder='Correo electrónico'
			autoComplete='email'
			required
			autoFocus
		/>
		<FormControl type='password' placeholder='Contraseña' required />

		<FormControl type='password' placeholder='Confirmar contraseña' required />

		<Button variant='primary' size='lg' className='rounded-pill'>
			Restablecer la contraseña
		</Button>

		<NavLink to='/login' className='text-center'>
			<FontAwesomeIcon icon='fa-solid fa-user' className='me-1' />
			¿Ya tienes una cuenta?
		</NavLink>
	</Form>
);

export default PasswordReset;