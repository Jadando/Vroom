import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { onSnapshot, collection, query, where, getFirestore } from 'firebase/firestore';


export default function HistoricoEmpresa({ route }) {
    const [IdentificadorEmpresa, setIdentificadorEmpresa] = useState(route.params?.IdentificadorEmpresa || '')
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [pesquisa, setPesquisa] = useState(null);
    const [resultados, setResultados] = useState([]);
    const [mostrarResultados, setMostrarResultados] = useState(false);
    const db = getFirestore();

    useEffect(() => {
        const HistoricoRef = collection(db, 'users', IdentificadorEmpresa, 'Pedidos');

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
                                            <TouchableOpacity onPress={() => navigation.navigate('VisualizarPedidoEmpresa', { nomeCliente: documento.data.nomeCliente, comanda: documento.data.comanda, pagamento: documento.data.tipoPagamento, valor: documento.data.valor })} key={index}>
                                                <View style={styles.recentsContent}>
                                                    <Text>
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
                    </ScrollView>
                );
            } else {
                return (
                    <View style={styles.container}>
                        <Text style={styles.Text}> faz seu primeiro pedido {'\n'}</Text>
                    </View>
                );
            }
        }
    };


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