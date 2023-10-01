import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function EmpresasAfiliadas() {
    const [modalVisible, setModalVisible] = useState(false);
    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerBell}><Icon name='notifications' size={30} color='#ffc000' /></TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>Empresas Afiliadas</Text>
            <Icon name='business' size={30} color='#00'/>
            </View>
            <View style={styles.rectangle}>
                <View style={styles.circle} />
                <View style={styles.textContainer}>
                    <Text style={styles.companyName}>Empresa: Luzia Hamburgers</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                        <Text style={styles.buttonText}>Desafiliar-se da Empresa</Text>
                    </TouchableOpacity>
                </View>
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
                            Tem certeza que deseja desafiliar-se dessa empresa?
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(!modalVisible)}
                                style={styles.modalBtn}>
                                <Text style={styles.modalContent}>
                                    Não
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.dispatch(StackActions.popToTop())}
                                style={styles.modalBtn}>
                                <Text style={styles.modalContent}>
                                    Sim
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginRight: 10,
    },
    rectangle: {
        backgroundColor: '#FFC000',
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
    },
    circle: {
        backgroundColor: 'white',
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
    },
    textContainer: {
        flexDirection: 'column',
    },
    companyName: {
        fontSize: 18,
        marginBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 10,
        borderRadius: 10
    },
    button: {
        backgroundColor: 'rgba(255, 57, 33, 0.5)',
        width: '100%',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    modalContainer: {
        alignSelf: 'center',
        marginTop: '50%',
        width: 300,
        backgroundColor: '#f2f2f2',
        margin: 20,
        borderRadius: 10,
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
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
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
        marginBottom: 20
    },
    modalContent: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#121212'
    },
    modalBtn: {
        width: '45%',
        height: 40,
        borderRadius: 10,
        backgroundColor: '#ffc000',
        padding: 5,
        marginBottom: 20,
        alignSelf: 'center'
    },
});