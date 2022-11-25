import {
    Title,
    Text,
    Card,
    Flex,
    Dropdown,
    DropdownItem,
    Bold,
    BarList,
} from '@tremor/react';

import { JSXElementConstructor, useEffect, useState } from 'react';
import store from '../../../redux/Store';
import { listarUsuarios } from '../../../redux/usuario/UsuarioActions';

const ActividadPorUsuario = () =>{
    
    const [selectedUsername, setSelectedUsername] = useState();
    const [filteredData, setFilteredData] = useState();
    const [usuariosPicker,setUsuariosPicker] = useState();
    const [ordenesEstado, setOrdenesEstado] = useState([]);


    const visits = [
        {
            name: 'Google',
            value: 456,
            category: 'organic',
        },
        {
            name: 'GitHub',
            value: 271,
            category: 'devTools',
        },
        {
            name: 'Twitter',
            value: 191,
            category: 'socials',
        },
        {
            name: 'Reddit',
            value: 185,
            category: 'socials',
        },
        {
            name: 'NPM',
            value: 179,
            category: 'devTools',
        },
        {
            name: 'Youtube',
            value: 91,
            category: 'socials',
        },
        {
            name: 'Medium',
            value: 42,
            category: 'blogs',
        },
        {
            name: 'DEV.to',
            value: 21,
            category: 'blogs',
        },
    ];

    useEffect(() => {
        setFilteredData(filterByUsername(selectedUsername, visits));
    }, [selectedUsername]);

    useEffect(()=>{
        listaUsuariosPicker();
    },[]);

    const listaUsuariosPicker = async()=>{
        try {
            const response = await store.dispatch(listarUsuarios());
            console.log("resp",(response.usuarios).filter(x => x.nivelUsuario=='3'));
            setUsuariosPicker((response.usuarios).filter(x => x.nivelUsuario=='3'));
        } catch (error) {
            console.log(error);
        }
    }

    const filterByUsername = (username, data) => (
        username === 'all'
            ? data
            : data.filter((item) => item.username === username)
    );

    const estadoOrdenTexto = (num) =>{
        switch (num) {
            case '1':
                return 'Pendiente';
            case '2':
                return 'Asignado';
            case '3':
                return 'En Curso';
            case '4':
                return 'Atendido';
            case '5':
                return 'Finalizado';
            case '6':
                return 'Anulado';
        }
    }
    const filtradoPorEstadodeOrden = (array) =>{
        setOrdenesEstado([]);
        //const param = array.filter(x =>x.estado=='4'|| x.estado=='3'||x.estado=='2');       
        const groupByCategory = array.reduce((group, product) => {
             const { estado } = product;
             group[estado] = group[estado] ?? [];
             group[estado].push(product);
             return group;
        }, {});
         //console.log("dsd",Object.getOwnPropertyNames(groupByCategory));
         Object.getOwnPropertyNames(groupByCategory).forEach((val) => {
         setOrdenesEstado((prev) => [...prev, {
              name: estadoOrdenTexto(groupByCategory[val][0].estado),
              value: groupByCategory[val].length 
         }]);
       });      
     }

    return (<>
            <Flex spaceX="space-x-8">
                <Title>Usuario</Title>
                <Dropdown
                    handleSelect={ (value) => setSelectedUsername(value) }
                    placeholder="Source Selection"
                    maxWidth="max-w-xs"
                >
                    {usuariosPicker?usuariosPicker.map((usuario) => (
                        <DropdownItem
                            key={ usuario.idUsuario}
                            value={ usuario.username}
                            text={ usuario.username }
                        />
                    )):null }
                </Dropdown>
            </Flex>
            <Flex marginTop="mt-8">
                <Text><Bold>Source</Bold></Text>
                <Text><Bold>Visits</Bold></Text>
            </Flex>
            <BarList
                data={ filteredData }
                showAnimation={ false }
                marginTop="mt-4"
            /></>
    );
}
export default ActividadPorUsuario;