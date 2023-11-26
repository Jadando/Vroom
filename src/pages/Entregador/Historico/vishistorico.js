import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function VisualizarHistorico({ route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [IdentificadorEmpresa, setIdentificadorEmpresa] = useState(route.params?.IdentificadorEmpresa || '')
    const [nomeCliente, setNomeCliente] = useState(route.params?.nomeCliente||'')
    const [codPedido, setcodPedido] = useState(route.params?.codPedido || '')
    const [order, setOrder] = useState(route.params?.comanda || '');
    const [value, setValue] = useState(route.params?.valor || '');
    const [payment, setPayment] = useState(route.params?.tipoPagamento || '');
    const navigation = useNavigation();

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode='never'
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.pop(1)}>
                        <Icon name='chevron-back' size={30} color='#000' style={{ marginLeft: 30 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name='notifications' size={30} color='#ffc000' />
                    </TouchableOpacity>
                </View>
                <View style={styles.pedidos}>
                    <Text style={styles.pedidosText}>Historico entrega</Text>
                    <View style={styles.pedidosClock}>
                        <Icon name='time-outline' size={30} color='#000' />
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.recentsContent}>
                        <Text>
                             {'\n'}
                            Cd pedido: {codPedido}
                        </Text>
                    </View>
                    <View style={styles.recentsContent}>
                        <Text>
                            Nome do cliente {'\n'}
                            {nomeCliente}
                        </Text>
                    </View>
                    <View style={styles.comanda}>
                        <Text style={styles.comandaTitle}>Comanda do pedido:</Text>
                        <View style={styles.comandaDescription}>
                            <TextInput
                                multiline={true}
                                onChangeText={text => setOrder(text)}
                                numberOfLines={4}
                                editable={false}
                                value={order}
                            />
                        </View>
                        <Text style={styles.comandaTitle}>Forma de pagamento:</Text>
                        <View style={styles.comandaPaymentValue}>
                            <TextInput
                                multiline={true}
                                onChangeText={text => setPayment(text)}
                                numberOfLines={4}
                                editable={false}
                                value={payment}
                            />
                        </View>
                        <Text style={styles.comandaTitle}>Valor do pedido:</Text>
                        <View style={styles.comandaPaymentValue}>
                            <TextInput
                                multiline={true}
                                onChangeText={text => setValue(text)}
                                numberOfLines={4}
                                editable={false}
                                value={value}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
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
    card: {
        backgroundColor: '#FFC000',
        height: 'fit-content',
        width: '90%',
        borderRadius: 8,
        padding: 10
    },
    recentsContent: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        elevation: 2,
        padding: 20,
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
    comanda: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        elevation: 2,
        padding: 20,
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
})
