import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import LogoutModal from '../../../components/logoutModal';
import { getFirestore, onSnapshot, doc } from "firebase/firestore";




export default function PerfilEntregador({ route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [Identificador, setIdentificador] = useState(route.params?.Identificador || '');
    const [nameuser, setNameUser] = useState(null);
    console.log(Identificador+" perfil entreagdor")
    const navigation = useNavigation();
    const tema = useTheme();
    const styles = getstyles(tema);


    useEffect(() => {
        const db = getFirestore();
        const docRef = doc(db, "usuario", "tabela", "entregador", Identificador);

        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                const userData = doc.data();
                setNameUser(userData.nome);
            } else {
                console.log("O documento não existe.");
            }
        });

        return () => {
            // Ao desmontar o componente, pare de ouvir as atualizações
            unsubscribe();
        };
    }, [Identificador]);

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

                <View style={styles.user}>
                    <View style={styles.userImg}>
                        <Image
                            source={require('../../../img/perfil.jpg')} />
                    </View>
                    <Text style={styles.userInfo}>{nameuser}</Text>
                </View>

                <View style={styles.btnArea}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => navigation.navigate('DadosEntregador',{
                            Identificador
                            })}>
                        <Text style={styles.btnText}>Meus dados</Text>
                        <Icon name='information' size={30} color='#000' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => navigation.navigate('EmpresasAfiliadas',{})}>
                        <Text style={styles.btnText}>Sua afiliação</Text>
                        <Icon name='business-outline' size={30} color='#000' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ConfigEntregador')}
                        style={styles.button}>
                        <Text style={styles.btnText}>Configurações</Text>
                        <Icon name='cog' size={30} color='#000' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.btnText}>Sair da conta</Text>
                        <Icon name='log-out-outline' size={30} color='#000' />
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
        flex: 1,
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
    user: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
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
    },
    userInfo: {
        fontSize: 20,
        color: tema.Tema.color
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
        width: '50%',
        height: 60,
        justifyContent: 'center',
        elevation: 2,
    },
    btnText: {
        fontSize: 18,
        marginRight: 15,
    },
})