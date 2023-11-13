import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getDocs, collection, query, where, getFirestore } from 'firebase/firestore';


export default function HistoricoEmpresa({ route }) {
    const [IdentificadorEmpresa, setIdentificadorEmpresa] = useState(route.params?.IdentificadorEmpresa || '')
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [pesquisa, setPesquisa] = useState(null);
    const [resultados, setResultados] = useState([]);
    const [mostrarResultados, setMostrarResultados] = useState(false);
    const db = getFirestore();

    const CarregarHistorico = async () => {
        setIsLoading(true);

        const HistoricoRef = collection(db, 'users', IdentificadorEmpresa, 'Pedidos');

        const q = query(HistoricoRef);

        try {
            const querySnapshot = await getDocs(q);
            const documentosEncontrados = [];

            querySnapshot.forEach((doc) => {
                const documentoComID = { id: doc.id, data: doc.data() };
                documentosEncontrados.push(documentoComID);
                //console.log(documentoComID)
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
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        overScrollMode='never'
                    >
                        <View style={styles.recents}>
                            <View style={styles.recentsContainer}>
                                {resultados.map((documento, index) => {
                                    // const imageUrl = imageUrls.find((img) => img.id === documento.id);
                                    return (
                                        <>
                                            <TouchableOpacity onPress={() => navigation.navigate('RastrearEmpresa', { IdentificadorEmpresa: documento.id })} key={index}>
                                                <View style={styles.recentsContent}>
                                                <View style={styles.recentsImages}>
                                                        {/* <Image source={{ uri: imageUrl.url }} key={documento.id} style={styles.image} /> */}
                                                    </View>
                                                    <Text>
                                                        {documento.data.nome} {'\n'}
                                                        {documento.data.pendentes}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </>
                                    );
                                })}
                            </View>
                        </View>
                    </ScrollView>
                );
            } else {
                return (
                    <View style={styles.container}>
                        <Text style={styles.Text}> Nenhum Pedido em andamento {'\n'}</Text>
                    </View>
                );
            }
        }
    };
    useEffect(() => {
        // Chama PesquisarHistorico apenas quando o componente é montado
        PesquisarHistorico();
    }, [IdentificadorEmpresa]);

 



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerBell}><Icon name='notifications' size={30} color='#ffc000' /></TouchableOpacity>
            </View>

            <View style={styles.pedidos}>
                <Text style={styles.pedidosText}>Histórico de entregas</Text>
                <View style={styles.pedidosClock}>
                    <Icon name='time-outline' size={30} color='#000' />
                </View>
            </View>
            {renderizarResultados()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        felx: 1,
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        backgroundColor: '#ffffffff'
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        marginTop: '5%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 20,
        marginBottom: 30
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 70
    },
    headerBell: {
        marginLeft: '90%',
    },
    title: {
        fontSize: 20,
    },
    pedidos: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        justifyContent: 'center',
    },
    pedidosText: {
        fontSize: 20
    },
    pedidosClock: {
        marginLeft: 10
    },
    recents: {
        alignSelf: 'flex-start',
        height: 1000
    },
    recentsTitle: {
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 10
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
        backgroundColor: '#f2f2f2',
        elevation: 2,
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
        backgroundColor: '#fff',
        width: 70,
        height: 70,
        marginRight: 10,
        overflow: 'hidden'
    },
    img: {
        width: 70,
        height: 70
    },
})