import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getFirestore, getDocs, where, collection, query } from "firebase/firestore";

export default function VisualizarPedido({ route }) {
    const [IdentificadorCliente, setIdentificador] = useState(route.params?.IdentificadorCliente || '');
    const [documento, setDocumento] = useState(route.params?.Documento || '');
    const [nome, setNome] = useState('Pizzaria do Morro');
    const [endereco, setEndereco] = useState('');
    const [order, setOrder] = useState("1x calabresa e 2x coca-cola");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0.0);
    const [inputValue, setInputValue] = useState();
    const [items, setItems] = useState("dinheiro");
    const db = getFirestore();

    const ConsultarPedidos = async (documento) => {

        console.log("Iniciando pesquisa");
        const DocRef = collection(db, 'users', IdentificadorCliente, 'Pedidos');
        const q = query(DocRef, where('id', '==', documento.data.id));

        try {
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                const documentoComID = { id: doc.id, data: doc.data() };
                // console.log(documentoComID)
                setNome(documentoComID.data.nomeEmpresa)
                setOrder(documentoComID.data.comanda)
                setItems(documentoComID.data.pagamento)
                setInputValue(documentoComID.data.valor)
            });
        } catch (error) {
            console.error('Erro ao consultar o Firestore:', error);
            throw error; // Adicione um throw para que o erro seja propagado para quem chamou a função
        }
    }
    useEffect(() => {
        ConsultarPedidos(documento)
    }, [IdentificadorCliente]);
    const formatToCurrency = (num) => {
        return "R$ " + num.toFixed(2).replace('.', ',');
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode='never'
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerBell}><Icon name='notifications' size={30} color='#ffc000' /></TouchableOpacity>
                </View>


                <View style={styles.pedidos}>
                    <Text style={styles.pedidosText}>Historico Pedido</Text>
                    <View style={styles.pedidosClock}>
                        <Icon name='timer' size={30} color='#000' />
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.recentsContent}>
                        <Text>
                            Nome da Empresa:
                        </Text>
                        <TextInput
                            style={{ fontSize: 16 }}
                            value={nome}
                            editable={false}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.comanda}>
                        <Text style={styles.comandaTitle}>Comanda do pedido:</Text>
                        <View style={styles.comandaDescription}>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                value={order}
                                editable={false}
                            />
                        </View>
                        <Text style={styles.comandaTitle}>Forma de pagamento:</Text>
                        <View style={styles.comandaPayment}>
                            <Text>{items}</Text>
                        </View>
                        <Text style={[
                            styles.comandaTitle,
                            {
                                zIndex: -1
                            }
                        ]}>Valor do pedido:</Text>
                        <View style={[
                            styles.comandaPaymentValue,
                            {
                                zIndex: -1
                            }
                        ]}>
                            <TextInput
                                value={inputValue}
                                editable={false}
                                onChangeText={text => {
                                    // Atualize o valor de inputValue diretamente
                                    setInputValue(text);

                                    // Removendo o prefixo R$ e espaços
                                    const strippedValue = text.replace("R$", "").trim();

                                    // Convertendo o valor (com virgula) para decimal (com ponto) e armazenando no estado
                                    const newValue = parseFloat(strippedValue.replace(',', '.'));
                                    if (!isNaN(newValue)) {
                                        setValue(newValue);
                                    } else {
                                        setValue(0.0);
                                    }
                                }}
                                keyboardType="numeric"
                                onBlur={() => {
                                    // Quando o TextInput perde o foco, formate-o para garantir que se pareça com um valor de moeda.
                                    setInputValue(formatToCurrency(value));
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        marginTop: '5%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 20,
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
    card: {
        backgroundColor: '#FFC000',
        height: 'fit-content',
        borderRadius: 8,
        padding: 10
    },
    recentsContent: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        elevation: 2,
        padding: 20,
        width: 320,
        height: 80,
        borderRadius: 10,
        alignContent: 'center',
        marginBottom: 20
    },
    recentsImages: {
        borderRadius: 50,
        backgroundColor: '#fff',
        width: 70,
        height: 70,
        marginRight: 10,
    },
    comanda: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        elevation: 2,
        padding: 20,
        width: 320,
        height: 'fit-content',
        borderRadius: 10,
        marginBottom: 20
    },
    comandaDescription: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        height: 'fit-content',
        padding: 10,
    },
    comandaPayment: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        height: 40,
        marginBottom: 'fit-content'
    },
    comandaPaymentValue: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        height: 40,
        padding: 10
    },
    comandaTitle: {
        marginBottom: 5,
        marginTop: 10,
    },
    button: {
        height: 50,
        width: 250,
        backgroundColor: '#ffc000',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 10,
        elevation: 2,
        marginBottom: 15
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '600',
    },
    modalContainer: {
        alignSelf: 'center',
        marginTop: '30%',
        width: 300,
        backgroundColor: '#f2f2f2',
        margin: 20,
        borderRadius: 20,
        height: 'fit-content',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 50
    },
    modalHeader: {
        backgroundColor: '#ffc000',
        width: '100%',
        height: 40,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    modalHeaderTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#121212',
        textAlign: 'center',
    },
    modalHeaderClose: {
        justifyContent: 'flex-end',
    },
    modalContentTitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 50
    },
    modalContent: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#121212'
    },
    link: {
        borderRadius: 10,
        backgroundColor: '#e5e5e5',
    },
    collapsed: {
        height: 40,
    },
    expanded: {
        height: 'auto',
    },
    linkButtonArea: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    linkButton: {
        marginLeft: 10,
        padding: 5,
    },
    modalButton: {
        height: 50,
        width: 150,
        backgroundColor: '#ffc000',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20,
        elevation: 2,
        marginBottom: 15
    },
})