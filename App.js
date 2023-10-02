import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTema } from './src/theme';
import { ThemeProvider } from 'styled-components';
import { Tabs, TabsEmpresa1,TabsEmpresa, TabsEntregador } from './src/components/BottomTab';


// Imports relacionados ao Cliente
import Home from './src/pages/Cliente/Home';
import Search from './src/pages/Cliente/Search';
import DadosCliente from './src/pages/Cliente/Perfil/DadosCliente';
import AlterarCliente from './src/pages/Cliente/Perfil/AlterarCliente';
import Config from './src/pages/Cliente/Perfil/Config1';
import CadastroCliente from './src/pages/Cadastros/Cliente/CadastroCliente';
import ClienteRevisa from './src/pages/Cadastros/Cliente/ClienteRevisa';
import PerfilCliente from './src/pages/Cliente/Perfil';
import VisualizarEmpresa from './src/pages/Cliente/VisualizarEmpresa';
import LocalCliente from './src/pages/Cliente/Pedidos'; 
import Pedidos from './src/pages/Cliente/Pedidos';
import Restaurante from './src/pages/Cliente/Search/Restaurante';

// Imports relacionados à Empresa
import PerfilEmpresa from './src/pages/Empresa/Perfil';
import IniciarEntrega from './src/pages/Empresa/IniciarEntrega';
import PendentesAndamento from './src/pages/Empresa/PendentesAndamento';
import RastrearEmpresa from './src/pages/Empresa/RastrearEmpresa';
import ConfigEmpresa from './src/pages/Empresa/Perfil/ConfigEmpresa';
import CadastroEmpresa from './src/pages/Cadastros/Empresa/CadastroEmpresa';
import EmpresaRevisa from './src/pages/Cadastros/Empresa/EmpresaRevisa';
import Afiliado from './src/pages/Cadastros/Empresa/Afiliado';
import DadosEmpresa from './src/pages/Empresa/Perfil/ConfigEmpresa/DadosEmpresa';
import EditarPerfil from './src/pages/Empresa/Perfil/ConfigEmpresa/EditarPerfil';
import AlterarEmpresa from './src/pages/Empresa/Perfil/ConfigEmpresa/AlterarEmpresa';
import Entregadores from './src/pages/Empresa/Perfil/Entregadores';

// Imports relacionados ao Entregador
import AceitarEntrega from './src/pages/Entregador/AceitarEntrega';
import FinalizarEntrega from './src/pages/Entregador/Temporario/Finalizar';
import PerfilEntregador from './src/pages/Entregador/Perfil';
import ConfigEntregador from './src/pages/Entregador/Perfil/ConfigEntregador';
import CadastroEntregador from './src/pages/Cadastros/Entregador/CadastroEntregador';
import EntregadorRevisa from './src/pages/Cadastros/Entregador/EntregadorRevisa';
import EmpresasAfiliadas from './src/pages/Entregador/Afiliacao/index';
import SemAfiliacao from './src/pages/Entregador/Afiliacao/SemAfiliacao';
import DadosEntregador from './src/pages/Entregador/Perfil/ConfigEntregador/DadosEntregador';
import AlterarEntregador from './src/pages/Entregador/Perfil/ConfigEntregador/AlterarEntregador';
import Historico from './src/pages/Entregador/Historico';
import Pendentes from './src/pages/Entregador/Pendentes';

// Imports gerais
import Teste from './src/pages/Teste';
import Mapa from './src/pages/Teste/Mapa';
import Login from './src/pages/Login';
import Cadastro from './src/pages/Cadastros/Cadastro';



const Stack = createStackNavigator();


export default function App() {
  const Tema = useTema()
  return (
    <ThemeProvider theme={Tema}>
    <NavigationContainer>

      <Stack.Navigator 
              initialRouteName='Login'
              screenOptions={{
                headerShown: false
              }}
            >
          {/* Telas do Cliente */}
          
          <Stack.Group title="Cliente" >
              <Stack.Screen name="Home" component={Tabs}/>
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="Restaurante" component={Restaurante} />
              <Stack.Screen name="DadosCliente" component={DadosCliente} />
              <Stack.Screen name="AlterarCliente" component={AlterarCliente} />
              <Stack.Screen name="Config" component={Config} />
              <Stack.Screen name="CadastroCliente" component={CadastroCliente} />
              <Stack.Screen name="ClienteRevisa" component={ClienteRevisa} />
              <Stack.Screen name="PerfilCliente" component={PerfilCliente} />
              <Stack.Screen name="VisualizarEmpresa" component={VisualizarEmpresa} />
              <Stack.Screen name='Pedidos' component={Pedidos} />
          </Stack.Group>

          {/* Telas relacionadas à Empresa */}
          <Stack.Group title="Empresa">
              <Stack.Screen name="PerfilEmpresa" component={PerfilEmpresa} />
              <Stack.Screen name="IniciarEntrega" component={TabsEmpresa} />
              <Stack.Screen name="PendentesAndamento" component={TabsEmpresa} />
              <Stack.Screen name="RastrearEmpresa" component={RastrearEmpresa} />
              <Stack.Screen name="ConfigEmpresa" component={ConfigEmpresa} />
              <Stack.Screen name="CadastroEmpresa" component={CadastroEmpresa} />
              <Stack.Screen name="EmpresaRevisa" component={EmpresaRevisa} />
              <Stack.Screen name="Afiliado" component={Afiliado} />
              <Stack.Screen name="DadosEmpresa" component={DadosEmpresa} />
              <Stack.Screen name="EditarPerfil" component={EditarPerfil } />
              <Stack.Screen name='AlterarEmpresa' component={AlterarEmpresa} />
              <Stack.Screen name='Entregadores' component={Entregadores} />
          </Stack.Group>

          {/* Telas relacionadas ao Entregador */}
          <Stack.Group title="Entregador">
              <Stack.Screen name="Historico" component={Historico} />
              <Stack.Screen name="AceitarEntrega" component={AceitarEntrega} />
              <Stack.Screen name="FinalizarEntrega" component={FinalizarEntrega} />
              <Stack.Screen name="PerfilEntregador" component={PerfilEntregador} />
              <Stack.Screen name="ConfigEntregador" component={ConfigEntregador} />
              <Stack.Screen name="CadastroEntregador" component={CadastroEntregador} />
              <Stack.Screen name="EntregadorRevisa" component={EntregadorRevisa} />
              <Stack.Screen name="EmpresasAfiliadas" component={EmpresasAfiliadas} />
              <Stack.Screen name="SemAfiliacao" component={SemAfiliacao} />
              <Stack.Screen name="DadosEntregador" component={DadosEntregador} />
              <Stack.Screen name="AlterarEntregador" component={AlterarEntregador} />
              <Stack.Screen name="Pendentes" component={TabsEntregador} />
          </Stack.Group>

          {/* Telas gerais */}
          <Stack.Screen name="Teste" component={Teste} />
          <Stack.Screen name="Mapa" component={Mapa} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
  );
}

// export default function App() {
//   const Tema = useTema()
//   const Tab = createBottomTabNavigator();
//   return (
//     <ThemeProvider theme={Tema}>
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName='Login'
//           screenOptions={{
//             headerShown: false
//           }}
//         >
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen name="Cadastro" component={Cadastro} />
//           <Tab.Screen name="Cliente" component={ClienteStack} />
//           <Tab.Screen name="Empresa" component={EmpresaStack} />
//           <Tab.Screen name="Entregador" component={EntregadorStack} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </ThemeProvider>

//   );
// }
