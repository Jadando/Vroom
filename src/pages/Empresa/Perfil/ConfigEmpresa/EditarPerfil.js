import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import LogoutModal from '../../../../components/logoutModal';


export default function EditarPerfil() {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const tema = useTheme();
    const styles = getstyles(tema);
    return (

        <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode='never'
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Icon name='notifications' size={30} color='#ffc000' />
                    </TouchableOpacity>
                </View>
                <View style={styles.pedidos}>
                <Text style={styles.pedidosText}>Editar perfil</Text>
                <View style={styles.pedidosClock}>
                    <Icon name='person-outline' size={30} color='#000' />
                </View>
            </View>
                <Text style={{fontSize: 18, marginBottom: 10}}>Veja como está seu perfil</Text>
                <View style={{borderRadius: 10, overflow: 'hidden',}}>
                <ImageBackground
                    source={require('../../../../img/header.png')}
                    style={styles.imageBackground}>
                    <View style={styles.user}>

                        <View style={styles.userImg}>
                            <Image
                                style={{width: '100%', height: '145%', top: -25}}
                                source={require('../../../../img/luzia.png')} />
                        </View>
                        <View style={styles.userInfo}>
                        <Text style={styles.userInfo}>Luzia Hamburgers</Text>
                        </View>
                    </View>
                </ImageBackground>
                </View>

                <View style={styles.btnArea}>
                    <TouchableOpacity style={styles.button}>
                    <Icon name='location' size={30} color='#000' />
                        <Text style={styles.btnText}>Endereço {'\n'} Rua João Deodorio N°215</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                    <Icon name='call' size={30} color='#000' />
                        <Text style={styles.btnText}>Telefone {'\n'} (13) 99345-6789</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonZap}>
                        <Text style={styles.btnZapText}>Entrar em contato via Whatsapp</Text>
                        <Icon name='logo-whatsapp' size={30} color='#000' />
                    </TouchableOpacity>
                </View>
                <LogoutModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </View>
        </ScrollView>
    );
}

const getstyles = (tema) => StyleSheet.create({
    container: {
        felx: 1,
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
        backgroundColor: tema.Tema.background
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        marginTop: '5%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 30,
        paddingRight: 20,
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
    imageBackground: {
        padding: 50,
    },
    user: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    userImg: {
        backgroundColor: '#d1d3d4ff',
        marginRight: 20,
        width: 100,
        height: 100,
        borderRadius: 50,
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#ffc000'
    },
    userInfo: {
        fontSize: 20,
        color: tema.Tema.color,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 5,
        fontWeight: '600',
    },
    btnArea: {
        marginTop: 50,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    button: {
        flexDirection: 'row',
        marginBottom: 30,
        backgroundColor: '#ffc000',
        borderRadius: 10,
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',
        width: '60%',
        height: 100,
        justifyContent: 'center',
        elevation: 2,
    },
    buttonZap: {
        marginBottom: 30,
        backgroundColor: '#ffc000',
        borderRadius: 10,
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',
        width: '60%',
        height: 100,
        justifyContent: 'center',
        elevation: 2,
    },
    btnZapText: {
        fontSize: 18,
        marginRight: 15,
        textAlign: 'center',
    },
    btnText: {
        fontSize: 18,
        marginRight: 15,
    },
})
