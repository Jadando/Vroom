import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import {collection, query, where, getFirestore, onSnapshot, addDoc } from 'firebase/firestore';
import * as Linking from 'expo-linking';
import { Alert } from 'react-native';
import queryString from 'query-string';


export default function Home({ route }) {
  const [IdentificadorCliente, setIdentificador] = useState(route.params?.IdentificadorCliente || '');
  const [cep, setCep] = useState(route.params?.cep);
  const [endereco, setEndereco] = useState("Seu Endereço")
  const [isLoading, setIsLoading] = useState(false);
  const [pesquisa, setPesquisa] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const db = getFirestore();
  const tema = useTheme();
  const styles = getstyles(tema);
  const navigation = useNavigation();
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  useEffect(() => {
    // Adiciona um manipulador para lidar com deep linking
    const manipularDeepLinking = async (evento) => {
      // Extrai a query string da URL do deep link
      const url = evento.url;

      // Extrai os valores da query string
      const params = url ? queryString.parse(url.replace('vroom://?', '')) : null;

      const nomeEmpresa = params && params.empresa;
      const endereco = params && params.endereco;
      const comanda = params && params.comanda;
      const pagamento = params && params.pagamento;
      const valor = params && params.valor;
      const status = params && params.status;

      // Exibe um alerta com as informações
      if (nomeEmpresa && endereco && comanda && pagamento && valor && status) {
        const mensagem = `Nome da Empresa: ${nomeEmpresa}\nEndereço: ${endereco}\nComanda: ${comanda}\nPagamento: ${pagamento}\nValor: ${valor}\nStatus: ${status}`;
        Alert.alert("Detalhes do Pedido", mensagem);

        const pedidosRef = collection(db, "users", IdentificadorCliente, "Pedidos");

        try {
          const novoPedidoDoc = await addDoc(pedidosRef, {
            nomeEmpresa: nomeEmpresa,
            comanda: comanda,
            pagamento: pagamento,
            valor: valor,
            status: "pendente",
            data:today.toLocaleDateString()
          });

          console.log("Pedido adicionado com sucesso. ID do documento:", novoPedidoDoc.id);
        } catch (error) {
          console.error('Erro ao adicionar o pedido:', error);
        }

      }
    }

    // Adiciona o manipulador ao evento de deep linking
    const linkEvento = Linking.addEventListener('url', manipularDeepLinking);

    // Remove o manipulador quando o componente é desmontado
    return () => {
      linkEvento.remove();
    };
  }, []);
  useEffect(() => {
    const HistoricoRef = collection(db, 'users', IdentificadorCliente, 'Pedidos');

    // Adicione seu filtro usando 'where'
    const q = query(HistoricoRef, where('status', '==', 'concluido')); // Substitua 'campo' e 'valor' pelos seus critérios de filtro

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const documentosEncontrados = [];

        querySnapshot.forEach((doc) => {
            const documentoComID = { id: doc.id, data: doc.data() };
            documentosEncontrados.push(documentoComID);
        });

        setResultados(documentosEncontrados);
        setIsLoading(false);
        setMostrarResultados(true);
    });

    // Limpe a assinatura quando o componente for desmontado ou quando necessário
    return () => unsubscribe();
}, []);
  const renderizarResultados = () => {
    if (mostrarResultados) {
      if (resultados.length > 0) {
        return (
          <View style={styles.recents}>
            <Text style={styles.recentsTitle}>Pedidos recentemente</Text>
            <View style={styles.recentsContainer}>
              {resultados.map((documento, index) => {
                return (
                  <>
                    <TouchableOpacity onPress={() => navigation.navigate('VisualizarPedido', {nomeEmpresa:documento.data.nomeEmpresa,comanda:documento.data.comanda,pagamento:documento.data.tipoPagamento,valor:documento.data.valor })} key={index}>
                      <View style={styles.recentsContent}>
                        <Text style={styles.Text}>
                          {documento.data.nomeEmpresa} {'\n'}
                          {documento.data.data}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                );
              })}
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.recents}>
            <View style={styles.container}>
              <Text style={styles.recentsTitle}>Nenhum pedido foi feito</Text>
            </View>
          </View>
        );
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerContent}>
          <Text style={styles.title}>
            {endereco}
          </Text>
          <Icon name='chevron-down' size={30} color={tema.Tema.color} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBell}><Icon name='notifications' size={30} color='#ffc000' /></TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode='never'
      >
        <View style={styles.categorias}>
          <View style={styles.categoriasContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Filter', {
              IdentificadorCliente,
              cep,
              categoria: 'restaurante'
            })}>
              <View style={styles.categoriasContent}>
                <Text style={{ ...styles.categoriaText, marginBottom: -15 }}>
                  Restaurantes
                </Text>
                <Image source={require('../../../img/restaurante.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Filter', {
              IdentificadorCliente,
              cep,
              categoria: 'farmacia'
            })}>
              <View style={styles.categoriasContent}>
                <Text style={styles.categoriaText}>Fármacias</Text>
                <Image source={require('../../../img/farm.png')} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriasContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Filter', {
              IdentificadorCliente,
              cep,
              categoria: 'bebida'
            })}>
              <View style={styles.categoriasContent}>
                <Text style={styles.categoriaText}>Bebidas</Text>
                <Image source={require('../../../img/bebida.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Filter', {
              IdentificadorCliente,
              cep,
              categoria: 'mercado'
            })}>
              <View style={styles.categoriasContent}>
                <Text style={{ ...styles.categoriaText, marginBottom: -5 }}>Mercados</Text>
                <Image source={require('../../../img/merc.png')} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriasContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Filter', {
              IdentificadorCliente,
              cep,
              categoria: 'jardinagem'
            })}>
              <View style={styles.categoriasContent}>
                <Text style={styles.categoriaText}>Jardinagem</Text>
                <Image source={require('../../../img/jard.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.categoriasContent}>
                <Text style={styles.categoriaText}>Outros</Text>
                <Image source={require('../../../img/outro.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {renderizarResultados()}
      </ScrollView>

    </View>
  );
}

const getstyles = (tema) => StyleSheet.create({
  container: {
    felx: 1,
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: tema.Tema.background
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 70,
  },
  headerBell: {
    alignSelf: 'flex-end'
  },
  title: {
    fontSize: 20,
    color: tema.Tema.color,
  },
  categorias: {
    backgroundColor: tema.Tema.background,
    margin: 15,
    padding: 15,
  },
  categoriasContainer: {
    flexDirection: 'row',
    padding: 15,
    margin: '-5%'
  },
  categoriasContent: {
    backgroundColor: tema.Tema.content,
    borderRadius: 10,
    padding: 10,
    margin: 15,
    width: 150,
    height: 80,
    alignItems: 'center',
  },
  categoriaText: {
    color: tema.Tema.color,
  },
  recents: {
    alignSelf: 'flex-start',
    margin: 20,
  },
  recentsTitle: {
    fontSize: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
    color: tema.Tema.color,
    marginRight: 5,
  },
  recentsContainer: {
    flex: 1,
    alignSelf: 'center',
    margin: 20,
    width: '100%',
    marginBottom: 100
  },
  recentsContent: {
    flexDirection: 'row',
    backgroundColor: tema.Tema.content,
    padding: 20,
    width: 320,
    height: 80,
    borderRadius: 10,
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  recentsImages: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#fff',
    width: 70,
    height: 70,
    marginRight: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffc000'
  },
  img: {
    width: 70,
    height: 70
  }
})