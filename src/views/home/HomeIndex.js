import { BarList, Bold, Flex, Text, Title, Card, Metric, Col, ColGrid, Datepicker } from '@tremor/react';
import {useEffect, useState} from 'react';
import {obtenerAutorizacion} from '../../config/LocalStorageService';
import { listarOrden, listarOrdenUsuarios } from '../../redux/ordenVenta/OrdenVentaActions';
import store from '../../redux/Store';
import { listarUsuarios } from '../../redux/usuario/UsuarioActions';
import ActividadPorUsuario from './componentes/ActividadPorUsuario';
import ActividadUsuarios from './componentes/ActividadUsuarios';
import EstadoOrdenes from './componentes/EstadoOrdenes';
import RefreshButton from '../layouts/partials/RefreshButton';
import ButtonExport from '../ordenVenta/components/ButtonExport';

const HomeIndex = ()=> {

    const [usuario, setUsuario] = useState({});
    const [selectedDate, setSelectedDate] = useState();

    useEffect(()=>{
        let data = obtenerAutorizacion();
        setUsuario(data);        
    },[]);
    
    return (
        <div className='container-fluid pt-5'>
            <RefreshButton></RefreshButton>
            <Card decoration="top" decorationColor="emerald"
                hFull={false}
                shadow={true}>
                <h4 className="text-muted mb-4">BIENVENIDO AL SISTEMA</h4>
                <div className="d-flex align-items-center">
                    <h3 className='me-3 align-self-baseline'>
                        <i className='bx bxs-user text-muted'></i>
                    </h3>
                    <div>                                
                        <h5 className="text-primary mb-1">
                        {window.usuario && (window.usuario.nombre+' '+window.usuario.apellido)}
                        </h5>
                        <i className="text-secondary">
                            {window.usuario && window.usuario.correo}
                        </i>
                    </div>
                </div>
            </Card>
            <br/>
            <ColGrid numCols={1} numColsSm={2} numColsLg={2} gapX="gap-x-2" gapY="gap-y-2">
                {window.usuario.nivelUsuario==1||window.usuario.nivelUsuario==2?
                <>
                    <Col>
                        <Card>
                            <Title>Actividad de Usuarios</Title>
                            <Flex justifyContent="justify-between" marginTop="mt-4">
                                <Text><Bold>Usuario</Bold></Text>
                                <Text><Bold>Órdenes</Bold></Text>
                            </Flex>
                            <ActividadUsuarios></ActividadUsuarios>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Title>Estado de Las Órdenes</Title>
                            <Flex justifyContent="justify-between" marginTop="mt-4">
                                <Text><Bold>Estado</Bold></Text>
                                <Text><Bold>Órdenes</Bold></Text>
                            </Flex>
                            <EstadoOrdenes></EstadoOrdenes>
                        </Card>
                        <br></br>
                        <Card>
                            <Title>Reporte General</Title>
                            <Flex justifyContent="justify-between" marginTop="mt-4">
                                <Text><Bold>Descargar (.xlsx)</Bold></Text>
                            </Flex>
                            <ButtonExport></ButtonExport>
                        </Card>
                    </Col>
                </>
                :null
            }
            </ColGrid>
        </div>
    )

}
export default HomeIndex;