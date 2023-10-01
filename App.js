import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTema } from './src/theme';
import { ThemeProvider } from 'styled-components';
import { Tabs, TabsEmpresa, TabsEntregador } from './src/components/BottomTab';

import Teste from './src/pages/Teste';
import Mapa from './src/pages/Teste/Mapa';
import Login from './src/pages/Login';
import Search from './src/pages/Cliente/Search';
import DadosCliente from './src/pages/Cliente/Perfil/DadosCliente';
import AlterarCliente from './src/pages/Cliente/Perfil/AlterarCliente';
import Config from './src/pages/Cliente/Perfil/Config1';
import Cadastro from './src/pages/Cadastros/Cadastro';
import CadastroCliente from './src/pages/Cadastros/Cliente/CadastroCliente';
import ClienteRevisa from './src/pages/Cadastros/Cliente/ClienteRevisa';
import CadastroEmpresa from './src/pages/Cadastros/Empresa/CadastroEmpresa';
import EmpresaRevisa from './src/pages/Cadastros/Empresa/EmpresaRevisa';
import CadastroEntregador from './src/pages/Cadastros/Entregador/CadastroEntregador';
import EntregadorRevisa from './src/pages/Cadastros/Entregador/EntregadorRevisa';
import Afiliado from './src/pages/Cadastros/Entregador/Afiliado';
import PerfilEmpresa from './src/pages/Empresa/Perfil';
import AceitarEntrega from './src/pages/Entregador/AceitarEntrega';
import FinalizarEntrega from './src/pages/Entregador/Temporario/Finalizar';
import PerfilEntregador from './src/pages/Entregador/Perfil';
import ConfigEntregador from './src/pages/Entregador/Perfil/ConfigEntregador';
import ConfigEmpresa from './src/pages/Empresa/Perfil/ConfigEmpresa';
import LocalCliente from './src/pages/Cliente/Pedidos/local';
import PerfilCliente from './src/pages/Cliente/Perfil';
import VisualizarEmpresa from './src/pages/Cliente/VisualizarEmpresa'
import EmpresasAfiliadas from './src/pages/Entregador/Afiliacao/index'
import SemAfiliadacao from './src/pages/Entregador/Afiliacao/SemAfiliacao'
import DadosEntregador from './src/pages/Entregador/Perfil/ConfigEntregador/DadosEntregador'
import AlterarEntregador from './src/pages/Entregador/Perfil/ConfigEntregador/AlterarEntregador'
import IniciarEntrega from './src/pages/Empresa/IniciarEntrega';
import PendentesAndamento from './src/pages/Empresa/PendentesAndamento';
import RastrearEmpresa from './src/pages/Empresa/RastrearEmpresa';

const Stack = createStackNavigator();

export default function App() {
  const Tema = useTema()
  return (
    <ThemeProvider theme={Tema}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='IniciarEntrega'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
          name='RastrearEmpresa'
          component={RastrearEmpresa}
          />
          <Stack.Screen
          name='PendentesAndamento'
          component={PendentesAndamento}
          />
          <Stack.Screen
            name='IniciarEntrega'
            component={IniciarEntrega}
          />
          <Stack.Screen
            name='PerfilEntregador'
            component={PerfilEntregador}
          />
          <Stack.Screen
            name='Pendentes'
            component={TabsEntregador}
          />
          <Stack.Screen
            name='Historico'
            component={TabsEntregador}
          />
          <Stack.Screen
            name='AlterarEntregador'
            component={AlterarEntregador}
          />
          <Stack.Screen
            name='DadosEntregador'
            component={DadosEntregador}
          />
          <Stack.Screen
            name='SemAfiliadacao'
            component={SemAfiliadacao}
          />
          <Stack.Screen
            name='EmpresasAfiliadas'
            component={EmpresasAfiliadas}
          />
          <Stack.Screen
            name='VisualizarEmpresa'
            component={VisualizarEmpresa}
          />
          <Stack.Screen
            name='PerfilCliente'
            component={PerfilCliente}
          />
          <Stack.Screen
            name='Local'
            component={LocalCliente}
          />
          <Stack.Screen
            name='ConfigEmpresa'
            component={ConfigEmpresa}
          />
          <Stack.Screen
            name='ConfigEntregador'
            component={ConfigEntregador}
          />
          <Stack.Screen
            name='AlterarCliente'
            component={AlterarCliente}
          />
          <Stack.Screen
            name='DadosCliente'
            component={DadosCliente}
          />

          <Stack.Screen
            name='Finalizar'
            component={FinalizarEntrega}
          />
          <Stack.Screen
            name='AceitarEntrega'
            component={AceitarEntrega}
          />
          <Stack.Screen
            name='PerfilEmpresa'
            component={PerfilEmpresa}
          />
          <Stack.Screen
            name='Config'
            component={Config}
          />
          <Stack.Screen
            name='Search'
            component={Search}
          />
          <Stack.Screen
            name='Mapa'
            component={Mapa}
          />
          <Stack.Screen
            name='Teste'
            component={Teste}
          />
          <Stack.Screen
            name='Login'
            component={Login}
          />
          <Stack.Screen
            name='Cadastro'
            component={Cadastro}
          />
          <Stack.Screen
            name='CadastroCliente'
            component={CadastroCliente}
          />
          <Stack.Screen
            name='ClienteRevisa'
            component={ClienteRevisa}
          />
          <Stack.Screen
            name='CadastroEmpresa'
            component={CadastroEmpresa}
          />
          <Stack.Screen
            name='EmpresaRevisa'
            component={EmpresaRevisa}
          />
          <Stack.Screen
            name='CadastroEntregador'
            component={CadastroEntregador}
          />
          <Stack.Screen
            name='EntregadorRevisa'
            component={EntregadorRevisa}
          />
          <Stack.Screen
            name='Afiliado'
            component={Afiliado}
          />
          <Stack.Screen
            name='Home'
            component={Tabs}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>

  );
}
