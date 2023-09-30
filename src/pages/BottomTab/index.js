import { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../Cliente/Home';
import Search from '../Cliente/Search';
import Perfil from '../Cliente/Perfil';
import Pedidos from '../Cliente/Pedidos';
import AceitarEntrega from '../Entregador/AceitarEntrega';
import Historico from '../Entregador/Historico';
import Pendentes from '../Entregador/Pendentes';

const Tab = createBottomTabNavigator();
const icons = {
    Home: {
        name: 'ios-home'
    },
    Buscar: {
        name: 'search'
    },
    Pedidos: {
        name: 'clipboard'
    },
    Perfil: {
        name: 'person'
    },
    Historico: {
        name: 'ios-home'
    },
    Pendentes: {
        name: 'ios-home'
    },
    AceitarEntrega: {
        name: 'ios-home'
    },
}
export function Tabs() {
    const tema = useTheme();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const { name } = icons[route.name];
                    return <Icon name={name} color={focused ? '#ffc000' : tema.Tema.color} size={25} />;
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
                        backgroundColor: tema.Tema.content,
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
            <Tab.Screen name="Pedidos" component={Pedidos} options={{ headerShown: false }} />
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
                    const { name } = icons[route.name];
                    return <Icon name={name} color={focused ? '#ffc000' : tema.Tema.color} size={25} />;
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
                        backgroundColor: tema.Tema.content,
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
            <Tab.Screen name="Historico" component={Historico} options={{ headerShown: false }} />
            <Tab.Screen name="Pendentes" component={Pendentes} options={{ headerShown: false }} />
            <Tab.Screen name="AceitarEntrega" component={AceitarEntrega} options={{ headerShown: false }} />
        </Tab.Navigator>


    );
}
export function TabsEmpresa() {
    const tema = useTheme();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const { name } = icons[route.name];
                    return <Icon name={name} color={focused ? '#ffc000' : tema.Tema.color} size={25} />;
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
                        backgroundColor: tema.Tema.content,
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
            <Tab.Screen name="Pedidos" component={Pedidos} options={{ headerShown: false }} />
            <Tab.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
        </Tab.Navigator>


    );
}