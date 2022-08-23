import {useEffect, useState} from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Breadcrumb from '../../components/Breadcrumb';

import {obtenerAutorizacion} from '../../config/LocalStorageService';

const HomeIndex = ()=> {

    const [usuario, setUsuario] = useState({});

    useEffect(()=>{
        let data = obtenerAutorizacion();
        
        setUsuario(data);
    },[]);

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Items>
                    <Breadcrumb.Item>
                        Mapa
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Home
                    </Breadcrumb.Item>
                </Breadcrumb.Items>
            </Breadcrumb>
            
            <Row>
                <Col>
                    <Card>                        
                        <Card.Body>
                        <h4 className="text-muted mb-4">BIENVENIDO AL SISTEMA</h4>
                        <div className="d-flex align-items-center">
                            <h3 className='me-3 align-self-baseline'>
                                <i className='bx bxs-user text-muted'></i>
                            </h3>
                            <div>                                
                                <h5 className="text-primary mb-1">
                                    {
                                        usuario && 
                                        `${usuario.persona?.nombre} ${usuario.persona?.materno} ${usuario.persona?.paterno}`
                                    }
                                </h5>
                                <i className="text-secondary">
                                    {usuario && usuario.persona?.correo}
                                </i>
                            </div>
                        </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )

}


export default HomeIndex;