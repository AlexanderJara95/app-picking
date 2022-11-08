import { BarList, Bold, Flex, Text, Title, Card, Metric, Col, ColGrid } from '@tremor/react';
import {useEffect, useState} from 'react';
import {obtenerAutorizacion} from '../../config/LocalStorageService';
import { listarOrdenUsuarios } from '../../redux/ordenVenta/OrdenVentaActions';
import store from '../../redux/Store';

const HomeIndex = ()=> {

    const [usuario, setUsuario] = useState({});
    const [usuariosOrden, setUsuariosOrden] = useState([]);

    useEffect(()=>{
        let data = obtenerAutorizacion();
        setUsuario(data);
        if(window.usuario.nivelUsuario==1)listaUsuarios();
    },[]);

    const listaUsuarios = async () =>{
        try {
            const response = await store.dispatch(listarOrdenUsuarios());
            filtradoPorEstado(response.listaOrden);
            //setUsuariosOrden();
        }catch(error){

        }
    }
    const filtradoPorEstado = (array) =>{
       const param = array.filter(x => x.estado=='3'||x.estado=='2');       
       const groupByCategory = param.reduce((group, product) => {
            const { username } = product;
            group[username] = group[username] ?? [];
            group[username].push(product);
            return group;
       }, {});
        console.log("dsd",Object.getOwnPropertyNames(groupByCategory));
        Object.getOwnPropertyNames(groupByCategory).forEach((val) => {
        setUsuariosOrden((prev) => [...prev, {
             name: groupByCategory[val][0].username,
             value: groupByCategory[val].length 
        }]);
      });
      
    }

    return (
        <div className='container-fluid pt-5'>
            <ColGrid numCols={1} numColsSm={2} numColsLg={2} gapX="gap-x-2" gapY="gap-y-2">
                <Col>
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
                </Col>
                <br></br>
                {window.usuario.nivelUsuario==1?
                <>
                    <Col>
                        <Card>
                            <Title>Actividad de Usuarios</Title>
                            <Flex justifyContent="justify-between" marginTop="mt-4">
                                <Text><Bold>Usuario</Bold></Text>
                                <Text><Bold>Órdenes</Bold></Text>
                            </Flex>
                            <BarList data={usuariosOrden} marginTop="mt-2" color='emerald' />
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