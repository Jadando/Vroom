import { useTheme } from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../pages/Cliente/Home';
import Search from '../../pages/Cliente/Search';
import Perfil from '../../pages/Cliente/Perfil';
import Pedidos from '../../pages/Cliente/Pedidos';
import IniciarEntrega from '../../pages/Empresa/IniciarEntrega';
import Historico from '../../pages/Entregador/Historico';
import Pendentes from '../../pages/Entregador/Pendentes';
import PerfilEntregador from '../../pages/Entregador/Perfil';
import PerfilEmpresa from '../../pages/Empresa/Perfil';
import PendentesAndamento from '../../pages/Empresa/PendentesAndamento';
import HistoricoEmpresa from '../../pages/Empresa/HistoricoEmpresa'
import LocalCliente from '../../pages/Cliente/Pedidos/local';

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

export function Tabs() {
    const tema = useTheme();
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
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Buscar" component={Search} options={{ headerShown: false }} />
            <Tab.Screen name="Pedidos" component={LocalCliente} options={{ headerShown: false }} />
            <Tab.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}
export function TabsEntregador() {
    const tema = useTheme();
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
              <Tab.Screen name="Pendentes" component={Pendentes} options={{ headerShown: false }} />
            <Tab.Screen name="Histórico" component={Historico} options={{ headerShown: false }} />
            <Tab.Screen name="Perfil" component={PerfilEntregador} options={{ headerShown: false }} />
        </Tab.Navigator>


    );
}
export function TabsEmpresa() {
    const tema = useTheme();
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
            <Tab.Screen name="IniciarﾠEntrega" component={IniciarEntrega} options={{ headerShown: false }} />
            <Tab.Screen name="Pendentes" component={PendentesAndamento} options={{ headerShown: false }} />
            <Tab.Screen name="Histórico" component={HistoricoEmpresa} options={{ headerShown: false }} />
            <Tab.Screen name="Perfil" component={PerfilEmpresa} options={{ headerShown: false }} />
        </Tab.Navigator>


    );
}