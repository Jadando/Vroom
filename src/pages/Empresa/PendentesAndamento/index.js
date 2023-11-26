import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { onSnapshot, collection, query, where, getFirestore } from 'firebase/firestore';

export default function PendentesAndamento({ route }) {
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
        const q = query(HistoricoRef, where('status', '==', 'pendente')); // Substitua 'campo' e 'valor' pelos seus critérios de filtro
    
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
                                    if (documento.data.status === "pendente") {
                                        return (
                                            <>
                                                <TouchableOpacity onPress={() => navigation.navigate('RastrearEmpresa', {comanda:documento.data.comanda,tipoPagamento:documento.data.tipoPagamento,valor:documento.data.valor})} key={index}>
                                                    <View style={styles.recentsContent}>
                                                        <Text>
                                                            {documento.data.comanda} {'\n'}
                                                            {documento.data.status}
                                                        </Text>
                                                        <View style={styles.recentsImages}>
                                                            <View style={styles.ongoing}>
                                                                <Icon name='bicycle-outline' size={40} color='#000' style={{ transform: [{ rotate: '-30deg' }] }} />
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </>
                                        );
                                    } else {
                                        return (
                                            <View style={styles.container}>
                                                <Text style={styles.Text}> nenhum a caminho pedido {'\n'}</Text>
                                            </View>
                                        );
                                    }
                                })}
                            </View>
                        </View>
                    </ScrollView>
                );
            } else {
                return (
                    <View style={styles.container}>
                        <Text style={styles.Text}> Você ainda não fez nenhum pedido {'\n'}</Text>
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
                <Text style={styles.pedidosText}>Entregas pendentes</Text>
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
        marginBottom: 20,
        justifyContent: 'space-between'
    },
    recentsImages: {
        borderRadius: 50,
        padding: 2,
        backgroundColor: '#fff',
        width: 70,
        height: 70,
        marginleft: 10,
        overflow: 'hidden',
    },
    ongoing: {
        borderRadius: 50,
        padding: 5,
        backgroundColor: '#ffc000',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})