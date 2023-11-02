import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import LogoutModal from '../../../components/logoutModal';
import { getFirestore, onSnapshot, doc } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

export default function PerfilEmpresa({route}) {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const tema = useTheme();
    const styles = getstyles(tema);
    const [IdentificadorEmpresa, setIdentificador] = useState(route.params?.IdentificadorEmpresa || '');
    const [logoImageUrl, setlogoImageUrl] = useState(null);

    const [nome, setNome] = useState(null);
    const [telefone, setTelefone] = useState(null);
    const [cep, setCep] = useState(null);
    const [estado, setEstado] = useState(null);
    const [cidade, setCidade] = useState(null);
    const [bairro, setBairro] = useState(null);
    const [endereco, setEndereco] = useState("teste");
    const [numero, setNumero] = useState(null);

    const storage = getStorage();
    const db = getFirestore();

    useEffect(() => {
        const docRef = doc(db, "users", IdentificadorEmpresa);

        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                const userData = doc.data();
                setNome(userData.nome);
                setTelefone(userData.telefone);
                setEndereco(userData.endereco);
                setNumero(userData.numero);
            } else {
                console.log("Empresa não existe.");
            }
        });

        DonwloadImages();
    }, [IdentificadorEmpresa]);

    async function DonwloadImages() {
        try {
            const logoRef = ref(storage, `images/users/empresa/${IdentificadorEmpresa}/${IdentificadorEmpresa}_profile_picture`);
            const logoUrl = await getDownloadURL(logoRef);
    
            if (logoUrl) {
                const logoResponse = await fetch(logoUrl);
                const logoData = await logoResponse.text();
                const logoNumericArray = logoData.split(",");
                const logoAsciiString = logoNumericArray.map((numericValue) => String.fromCharCode(parseInt(numericValue))).join("");
                setlogoImageUrl('data:image/jpeg;base64,' + logoAsciiString);
            } else {
                setlogoImageUrl("https://i.imgur.com/ithUisk.png");
            }
        } catch (error) {
            console.error('Erro ao recuperar a URL da imagem:', error);
            setlogoImageUrl("https://i.imgur.com/ithUisk.png");
        }
    }
    

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
                        style={{ width: '100%', height: '100%'}}
                        source={{ uri: logoImageUrl }} />
                </View>
                <Text style={styles.userInfo}>{nome}</Text>
            </View>

            <View style={styles.btnArea}>
                <TouchableOpacity 
                onPress={() => navigation.navigate('EditarPerfil',{
                    IdentificadorEmpresa
                })}
                style={styles.button}>
                    <Text style={styles.btnText}>Editar perfil</Text>
                    <Icon name='person-outline' size={30} color='#000' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                 onPress={() => navigation.navigate('DadosEmpresa',{
                    IdentificadorEmpresa
                 })}>
                    <Text style={styles.btnText}>Meus dados</Text>
                    <Icon name='information' size={30} color='#000' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate('Entregadores',{
                    IdentificadorEmpresa
                })}>
                    <Text style={styles.btnText}>Entregadores</Text>
                    <Icon name='bicycle-outline' size={30} color='#000' />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ConfigEmpresa',{
                        IdentificadorEmpresa
                    })}
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
    user: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    userImg: {
        backgroundColor: '#d1d3d4ff',
        marginRight: 20,
        width: 120,
        height: 120,
        borderRadius: 100,
        alignContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#ffc000'
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