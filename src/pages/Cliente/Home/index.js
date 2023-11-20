import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getDocs, collection, query, where, getFirestore } from 'firebase/firestore';
import axios from 'axios';
import { Alert } from 'react-native';


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
//   // function enviarDadosParaAPI(valores) {
//   //   axios.post('http://vroom-401401.web.app/api/enviarDados', valores)
//   //     .then(response => {
//   //       const { url } = response.data;
//   //       console.log(url+ " teste")
//   //       alert(`Valores enviados com sucesso! Abra o link: ${url}`);
//   //     })
//   //     .catch(error => {
//   //       console.error('Erro ao enviar dados para a API', error);
//   //     });
//   // }
  
//   // Exemplo de uso
//   const valores = {
//     nomeEmpresa: 'penis',
//     endereco: 'enderecoDaEmpresa',
//     comanda: 'comanda123',
//     pagamento: 'cartao',
//     valor: '100.00',
//     status: 'pendente'
//   };
//   console.log(valores.comanda)
//  //enviarDadosParaAPI(valores);
  const CarregarHistorico = async () => {
    setIsLoading(true);

    const HistoricoRef = collection(db, 'users', IdentificadorCliente, 'Pedidos');

    const q = query(HistoricoRef,where('status','==','concluido'));

    try {
      const querySnapshot = await getDocs(q);
      const documentosEncontrados = [];

      querySnapshot.forEach((doc) => {
        const documentoComID = { id: doc.id, data: doc.data() };
        documentosEncontrados.push(documentoComID);
      });

      return documentosEncontrados;
    } catch (error) {
      console.error('Erro ao consultar o Firestore:', error);
      throw error; // Adicione um throw para que o erro seja propagado para quem chamou a função
    }
  }

  // async function DonwloadImg(documento) {
  //   try {
  //     const storage = getStorage();
  //     const imageRef = ref(storage, `images/users/empresa/${documento.id}/${documento.id}_profile_picture`);
  //     const url = await getDownloadURL(imageRef);
  //     const response = await fetch(url);
  //     const data = await response.text();
  //     const numericArray = data.split(",");
  //     const asciiString = numericArray.map((numericValue) => String.fromCharCode(parseInt(numericValue))).join("");
  //     const imageUrl = {
  //       id: documento.id,
  //       url: 'data:image/jpeg;base64,' + asciiString
  //     };

  //     setImageUrls((prevImageUrls) => [...prevImageUrls, imageUrl]);
  //   } catch (error) {
  //     console.error('Erro ao recuperar a URL da imagem:', error);
  //   }
  // }

  const PesquisarHistorico = async () => {
    try {
      const resultadoDaConsulta = await CarregarHistorico();
      setImageUrls([]);
      resultadoDaConsulta.forEach(async (documento) => {
        // Vou adicionar uma função assíncrona aqui para baixar a imagem, se necessário
        // await DonwloadImg(documento);
        // Adicione a lógica necessária para baixar a imagem, se necessário
      });
      setResultados(resultadoDaConsulta);
      setIsLoading(false);
      setMostrarResultados(true);
    } catch (error) {
      setIsLoading(false);
      console.error('Erro ao consultar o Firestore:', error);
    }
  };
  const renderizarResultados = () => {
    if (mostrarResultados) {
      if (resultados.length > 0) {
        return (
          <View style={styles.recents}>
            <Text style={styles.recentsTitle}>Pedidos recentemente</Text>
            <View style={styles.recentsContainer}>
              {resultados.map((documento, index) => {
                // const imageUrl = imageUrls.find((img) => img.id === documento.id);
                return (
                  <>
                    <TouchableOpacity onPress={() => navigation.navigate('VisualizarPedido', { IdentificadorCliente, Documento: documento })} key={index}>
                      <View style={styles.recentsContent}>
                        <View style={styles.recentsImages}>
                          {/* <Image source={{ uri: imageUrl.url }} key={documento.id} style={styles.image} /> */}
                        </View>
                        <Text style={styles.Text}>
                          {documento.data.status} {'\n'}
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
  useEffect(() => {
    // Chama PesquisarHistorico apenas quando o componente é montado
    PesquisarHistorico();
  }, [IdentificadorCliente]);
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