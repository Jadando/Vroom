import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AceitarEntrega() {

    const [modalVisible, setModalVisible] = useState(false);
    const [order, setOrder] = useState("1 X-salada\n1 Coca cola");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Dinheiro', value: 'java' },
        { label: 'Cartão débito ou crédito', value: 'cartao' },
        { label: 'Pix', value: 'pix' }
    ]);
    const closeModal = () => {
        setModalVisible(false);
    }
    const [isExpanded, setIsExpanded] = useState(false);
    const url = 'https://figma.com/file/c97hMDfgLoFFWEAcetzH9C/TCC?type=design&node-id=0-1&mode=design&t=nfWUP24yYaj2kbHm-0';
    const displayUrl = isExpanded ? url : url.substring(0, 35) + '...';

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
                    <Text style={styles.pedidosText}>Iniciar entrega</Text>
                    <View style={styles.pedidosClock}>
                        <Icon name='time-outline' size={30} color='#000' />
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.recentsContent}>
                        <View style={styles.recentsImages}>
                        </View>
                        <Text>
                            Luzia Hamburgers {'\n'}
                            Cd pedido: 01
                        </Text>
                    </View>
                    <View style={styles.recentsContent}>
                        <View style={styles.recentsImages}>
                        </View>
                        <Text>
                            Nome do cliente {'\n'}
                            João Alvero Santos Lula
                        </Text>
                    </View>
                    <View style={styles.comanda}>
                        <Text style={styles.comandaTitle}>Comanda do pedido:</Text>
                        <View style={styles.comandaDescription}>
                            <TextInput
                                multiline={true}
                                onChangeText={text => setOrder(text)}
                                numberOfLines={4}
                                value={order}
                            />
                        </View>
                        <Text style={styles.comandaTitle}>Forma de pagamento:</Text>
                        <View style={styles.comandaPayment}>
                            <DropDownPicker
                                editable={false}
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                placeholder='Selecione uma opção'
                                style={{ borderColor: 'transparent', zIndex: 1, position: 'relative' }}
                                dropDownContainerStyle={{ borderColor: 'transparent', zIndex: 1, position: 'absolute' }}
                            />
                        </View>
                        <Text style={styles.comandaTitle}>Valor do pedido:</Text>
                        <View style={styles.comandaPaymentValue}>
                            <Text>R$ 15,99</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Iniciar entrega</Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType='slide'
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderTitle}>Aviso</Text>
                        <TouchableOpacity
                            style={styles.modalHeaderClose}
                            onPress={() => setModalVisible(!modalVisible)} >
                            <Image source={require('../../../img/close.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.modalContentTitle}>
                            Envie este link para o cliente para iniciar o pedido
                        </Text>
                        <View style={styles.link}>
                            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                                <TextInput
                                    value={displayUrl}
                                    multiline={true}
                                    editable={false}
                                    style={[styles.textInput, isExpanded ? styles.expanded : styles.collapsed]}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.linkButtonArea}>
                            <View style={styles.linkButton}>
                                <TouchableOpacity
                                //função do link aqui
                                >
                                    <Text style={{ textDecorationLine: 'underline' }}>Copiar URL</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            style={styles.modalButton}>
                            <Text>Ok entendi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
