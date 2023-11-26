import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getDocs, collection, query, where, getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from '../../pages/Cliente/Home';
import Search from '../../pages/Cliente/Search';
import Perfil from '../../pages/Cliente/Perfil';

import IniciarEntrega from '../../pages/Empresa/IniciarEntrega';
import Historico from '../../pages/Entregador/Historico';
import Pendentes from '../../pages/Entregador/Pendentes';
import PerfilEntregador from '../../pages/Entregador/Perfil';
import PerfilEmpresa from '../../pages/Empresa/Perfil';
import PendentesAndamento from '../../pages/Empresa/PendentesAndamento';
import HistoricoEmpresa from '../../pages/Empresa/HistoricoEmpresa'
import LocalCliente from '../../pages/Cliente/Pedidos/index';

const Tab = createBottomTabNavigator();

const icons = {
    Home: {
        lib: Ionicons,
        name: 'ios-home'
    },
    Buscar: {
        lib: Ionicons,
        name: 'search'
    },
    Pedidos: {
        lib: Ionicons,
        name: 'clipboard'
    },
    Perfil: {
        lib: Ionicons,
        name: 'person'
    },
    Histórico: {
        lib: MaterialCommunityIcons,
        name: 'clipboard-clock-outline'
    },
    Pendentes: {
        lib: MaterialCommunityIcons,
        name: 'clipboard-clock-outline'
    },
    IniciarﾠEntrega: {
        lib: Ionicons,
        name: 'bicycle'
    },
}


export function Tabs({ route }) {
    const [IdentificadorCliente, setIdentificador] = useState(route.params?.IdentificadorCliente || '');
    const [documentoComID, setDocumentoComID] = useState(null);
    const tema = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore();
            const q = query(collection(db, "users"), where("id", "==", IdentificadorCliente));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                setDocumentoComID({ data: doc.data() });
            });
        };

        fetchData();
    }, [IdentificadorCliente]);

    if (!documentoComID) {
        // Se os dados ainda não foram carregados, você pode renderizar algo de carregamento ou null
        return null;
    }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const { lib: IconComponent, name } = icons[route.name];
                    return <IconComponent name={name} color={focused ? '#ffc000' : tema.Tema.color} size={25} />;
                },
                tabBarActiveTintColor: '#ffc000',
                tabBarItemStyle: {
                    // adicionar algo caso queira
                },
                tabBarStyle: [
                    {
                        display: 'flex',
                        elevation: 10,
                        height: 60,
                        backgroundColor: '#fff',
                        paddingBottom: 5,
                        paddingTop: 5,
                        shadowColor: '#000',
                        shadowOpacity: 1,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowRadius: 4,
                    },
                    null,
                ],
                tabBarLabelStyle: {
                    fontSize: 15,
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} initialParams={{ IdentificadorCliente: IdentificadorCliente, cep: documentoComID.data.cep }} />
            <Tab.Screen name="Buscar" component={Search} options={{ headerShown: false }} initialParams={{ IdentificadorCliente: IdentificadorCliente, cep: documentoComID.data.cep }} />
            <Tab.Screen name="Pedidos" component={LocalCliente} options={{ headerShown: false }} initialParams={{ IdentificadorCliente: IdentificadorCliente }} />
            <Tab.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} initialParams={{ IdentificadorCliente: IdentificadorCliente }} />
        </Tab.Navigator>
    );
}


export function TabsEntregador({ route }) {
    const [IdentificadorEntregador, setIdentificador] = useState(route.params?.IdentificadorEntregador || '');
    const [documentoComID, setDocumentoComID] = useState(null);
    const tema = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore();
            const q = query(collection(db, "users"), where("id", "==", IdentificadorEntregador));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                setDocumentoComID({ data: doc.data() });
            });
        };

        fetchData();
    }, [IdentificadorEntregador]);

    if (!documentoComID) {
        // Se os dados ainda não foram carregados, você pode renderizar algo de carregamento ou null
        return null;
    }
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const { lib: IconComponent, name } = icons[route.name];
                    return <IconComponent name={name} color={focused ? '#ffc000' : tema.Tema.color} size={25} />;
                },
                tabBarActiveTintColor: '#ffc000',
                tabBarItemStyle: {
                    // adicionar algo caso queira
                },
                tabBarStyle: [
                    {
                        display: 'flex',
                        elevation: 10,
                        height: 60,
                        backgroundColor: '#fff',
                        paddingBottom: 5,
                        paddingTop: 5,
                        shadowColor: '#000',
                        shadowOpacity: 1,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowRadius: 4,
                    },
                    null,
                ],
                tabBarLabelStyle: {
                    fontSize: 15,
                },
            })}
        >
            <Tab.Screen name="Pendentes" component={Pendentes} options={{ headerShown: false }} initialParams={{ IdentificadorEntregador: IdentificadorEntregador, IdentificadorEmpresa: documentoComID.data.idEmpresa }} />
            <Tab.Screen name="Histórico" component={Historico} options={{ headerShown: false }} initialParams={{ IdentificadorEntregador: IdentificadorEntregador, IdentificadorEmpresa: documentoComID.data.idEmpresa }} />
            <Tab.Screen name="Perfil" component={PerfilEntregador} options={{ headerShown: false }} initialParams={{ IdentificadorEntregador: IdentificadorEntregador }} />
        </Tab.Navigator>


    );
}
export function TabsEmpresa({ route }) {
    const [IdentificadorEmpresa, setIdentificador] = useState(route.params?.IdentificadorEmpresa || '');
    const [documentoComID, setDocumentoComID] = useState(null);
    const tema = useTheme();
    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore();
            const q = query(collection(db, "users"), where("id", "==", IdentificadorEmpresa));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                setDocumentoComID({ data: doc.data() });
            });
        };

        fetchData();
    }, [IdentificadorEmpresa]);

    if (!documentoComID) {
        // Se os dados ainda não foram carregados, você pode renderizar algo de carregamento ou null
        return null;
    }
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const { lib: IconComponent, name } = icons[route.name];
                    return <IconComponent name={name} color={focused ? '#ffc000' : tema.Tema.color} size={25} />;
                },
                tabBarActiveTintColor: '#ffc000',
                tabBarItemStyle: {
                    // adicionar algo caso queira
                },
                tabBarStyle: [
                    {
                        display: 'flex',
                        elevation: 10,
                        height: 60,
                        backgroundColor: '#fff',
                        paddingBottom: 5,
                        paddingTop: 5,
                        shadowColor: '#000',
                        shadowOpacity: 1,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowRadius: 4,
                    },
                    null,
                ],
                tabBarLabelStyle: {
                    fontSize: 15,
                },
            })}
        >
            <Tab.Screen name="IniciarﾠEntrega" component={IniciarEntrega} options={{ headerShown: false }} initialParams={{ IdentificadorEmpresa: IdentificadorEmpresa, nomeEmpresa: documentoComID.data.nome }} />
            <Tab.Screen name="Pendentes" component={PendentesAndamento} options={{ headerShown: false }} initialParams={{ IdentificadorEmpresa: IdentificadorEmpresa }} />
            <Tab.Screen name="Histórico" component={HistoricoEmpresa} options={{ headerShown: false }} initialParams={{ IdentificadorEmpresa: IdentificadorEmpresa }} />
            <Tab.Screen name="Perfil" component={PerfilEmpresa} options={{ headerShown: false }} initialParams={{ IdentificadorEmpresa: IdentificadorEmpresa }} />
        </Tab.Navigator>


    );
}