import {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {toastme} from 'toastmejs';
import {StatusCodes} from 'http-status-codes';
import Breadcrumb from '../../components/Breadcrumb';

import store from '../../redux/Store';
import {eliminarUsuario,listarUsuarios} from '../../redux/usuario/UsuarioActions';
import { listarPerfiles } from '../../redux/perfil/PerfilActions';

import { swalAlertConfirm } from '../../utils/SwalHelper.js';

const UsuarioIndex = ()=> {
    const [usuarios, setUsuarios] = useState([]);
    const [perfiles, setPerfiles] = useState([]);

    const listadoDeUsuarios = async ()=> {
        try {
            const response = await store.dispatch(listarUsuarios());
            setUsuarios(response.usuarios);            
        } catch (error) {
            console.log(error);
        }
    }

    const listadoDePerfiles = async ()=> {
        try {
            const response = await store.dispatch(listarPerfiles());
            console.log(response);
            setPerfiles(response.perfiles);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{
        listadoDeUsuarios();
        listadoDePerfiles();
    }, []);

    const buscarUsuarios = ()=> {
        listadoDeUsuarios();
    }
    const eliminarRegistro = async (item) => {
        try {
            const pregunta = `¿Seguro que quiere eliminar el usuario <b>${item.nombreUsuario}</b>?`;

            const opcionSeleccionado = await swalAlertConfirm(pregunta);

            if (!opcionSeleccionado.isConfirmed) return;

            const response = await store.dispatch(eliminarUsuario(item.id));
            
            if(response.status === StatusCodes.OK) {
                toastme.success(response.data.mensaje);
                listadoDeUsuarios();
            } else toastme.warning(response.data.mensaje);

        } catch (error) {
            console.log(error);
            toastme.error('Ocurrió un error inesperado. Si este problema continúa comunícate con asistencia técnica.');
        }
    }
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Items>
                    <Breadcrumb.Item>
                        Administración
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Sistema
                    </Breadcrumb.Item>
                    <Breadcrumb.Item className="active">
                        Usuarios
                    </Breadcrumb.Item>
                </Breadcrumb.Items>
                
                <Breadcrumb.Actions>
                    <NavLink to='/usuarios/registro' className="btn btn-sm btn-success">
                        <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
                        <span className="d-none d-sm-inline-block">Nuevo</span>
                    </NavLink>
                </Breadcrumb.Actions>
            </Breadcrumb>

            <Row>
                <Col>
                    <Card className='mb-2'>
                        <Card.Header className="d-flex align-items-center justify-content-between">
                            <label className="mb-0 fw-bold text-dark">
                                Búsqueda
                            </label>
                            <div>
                                <Button variant='outline-primary' size='sm' onClick={buscarUsuarios}>
                                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> {' '}
                                    <span className="d-none d-sm-inline-block">Buscar</span>
                                </Button> {' '}
                                <Button variant='outline-secondary' size='sm'>
                                    <FontAwesomeIcon icon="fa-solid fa-broom" /> {' '}
                                    <span className="d-none d-sm-inline-block">Limpiar</span>
                                </Button>
                                <Button variant='light' size='sm' className='ms-2' data-bs-toggle="collapse" data-bs-target="#filterBasic" >
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-down" size="lg" />
                                </Button>
                            </div>
                        </Card.Header>
                        <div className="collapse" id="filterBasic">
                            <Card.Body>
                                <Form>
                                    <Row className='g-3'>
                                        <Col xs={12} sm={6} md={4} lg={3} >
                                            <Form.Label>
                                                Codigo
                                            </Form.Label>
                                            <Form.Control size="sm" type='text' />
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} >
                                            <Form.Label>
                                                Nombres
                                            </Form.Label>
                                            <Form.Control size="sm" type='text' />
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} >
                                            <Form.Label>
                                                Apellidos
                                            </Form.Label>
                                            <Form.Control size="sm" type='text' />
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} >
                                            <Form.Label>
                                                Usuario
                                            </Form.Label>
                                            <Form.Control size="sm" type='text' />
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} >
                                            <Form.Label>
                                                Perfil
                                            </Form.Label>
                                            <Form.Select size="sm">
                                                <option>-Seleccione-</option>
                                                {
                                                    perfiles && 
                                                    perfiles.map(p =>(
                                                        <option value={p.id} key={p.id}>{p.nombre}</option>                                                        
                                                    ))
                                                }
                                            </Form.Select>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} >
                                            <Form.Label>
                                                &nbsp;
                                            </Form.Label>
                                            <Form.Check type="checkbox" label="Incluir registro inactivos" />
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card className='mb-2'>
                        <Card.Header>
                            <label className="mb-0 fw-bold text-dark">
                                Listado de usuarios
                            </label>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th>Usuario</th>
                                        <th>Perfil</th>
                                        <th className='text-center'>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        usuarios &&
                                        usuarios.map((u, i) =>(
                                            <tr key={u.id}>
                                                <td>{i + 1}</td>
                                                <td>{u.nombre}</td>
                                                <td>{u.paterno}</td>
                                                <td>{u.usuario?.nombreUsuario}</td>
                                                <td>{u.usuario?.perfil?.nombre}</td>
                                                <td className='text-center'>
                                                    <NavLink to={`/usuarios/editar/${u.id}`} title="Editar"
                                                        className="btn-sm btn-outline-primary border-0" >
                                                        <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                    </NavLink> {' '}
                                                    <Button variant="outline-danger" onClick={()=>eliminarRegistro(u)}
                                                    size='sm' className='border-0' title='Eliminar'>
                                                    <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>                
                </Col>
            </Row>
        </>
    )
}

export default UsuarioIndex;