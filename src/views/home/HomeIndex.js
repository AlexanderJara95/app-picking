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
                        Dashboard
                    </Breadcrumb.Item>
                </Breadcrumb.Items>
            </Breadcrumb>
            <Card>                        
                <Card.Body>
                <h4 className="text-muted mb-4">BIENVENIDO AL SISTEMA</h4>
                <div className="d-flex align-items-center">
                    <h3 className='me-3 align-self-baseline'>
                        <i className='bx bxs-user text-muted'></i>
                    </h3>
                    <div>                                
                        <h5 className="text-primary mb-1">
                        {window.usuario && window.usuario.correo}
                        </h5>
                        <i className="text-secondary">
                            {window.usuario && window.usuario.correo}
                        </i>
                    </div>
                </div>
                </Card.Body>
            </Card>
        </>
    )

}


export default HomeIndex;