import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import LogoutModal from '../../../components/logoutModal';
import * as Linking from 'expo-linking';
import { getFirestore, onSnapshot, doc } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


export default function VisualizarPerfil({ route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const tema = useTheme();
    const styles = getstyles(tema);
    const [IdentificadorEmpresa, setIdentificador] = useState(route.params?.IdentificadorEmpresa || '');
    console.log(IdentificadorEmpresa)
    const [logoImageUrl, setlogoImageUrl] = useState(null);
    const [bannerImageUrl, setbannerImageUrl] = useState(null);
    const [whatsapp, setWhatsapp] = useState(null);
    const [nome, setNome] = useState(null);
    const [telefone, setTelefone] = useState(null);
    const [cep, setCep] = useState(null);
    const [estado, setEstado] = useState(null);
    const [cidade, setCidade] = useState(null);
    const [bairro, setBairro] = useState(null);
    const [endereco, setEndereco] = useState(null);
    const [numero, setNumero] = useState(null);

    const storage = getStorage();
    const db = getFirestore();

    useEffect(() => {
        const docRef = doc(db, "usuario", "tabela", "empresa", IdentificadorEmpresa);

        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                const userData = doc.data();
                setNome(userData.nome);
                setTelefone(userData.telefone);
                setEndereco(userData.endereco);
                setNumero(userData.numero);
                setWhatsapp(userData.telefone)
            } else {
                console.log("Empresa não existe.");
            }
        });

        DonwloadImages();
    }, [IdentificadorEmpresa]);

    async function DonwloadImages() {
        try {
            const logoRef = ref(storage, `usuario/imagem/empresa/${IdentificadorEmpresa}/${IdentificadorEmpresa}`);
            const bannerRef = ref(storage, `usuario/imagem/empresa/${IdentificadorEmpresa}/banner_company`);

            const [logoUrl, bannerUrl] = await Promise.all([
                getDownloadURL(logoRef),
                getDownloadURL(bannerRef),
            ]);

            const [logoResponse, bannerResponse] = await Promise.all([
                fetch(logoUrl),
                fetch(bannerUrl),
            ]);

            const [logoData, bannerData] = await Promise.all([
                logoResponse.text(),
                bannerResponse.text(),
            ]);

            const [logoNumericArray, bannerNumericArray] = await Promise.all([
                logoData.split(","),
                bannerData.split(","),
            ]);

            const [logoAsciiString, bannerAsciiString] = await Promise.all([
                logoNumericArray.map((numericValue) => String.fromCharCode(parseInt(numericValue))).join(""),
                bannerNumericArray.map((numericValue) => String.fromCharCode(parseInt(numericValue))).join(""),
            ]);

            setlogoImageUrl('data:image/jpeg;base64,' + logoAsciiString);
            setbannerImageUrl('data:image/jpeg;base64,' + bannerAsciiString);
        } catch (error) {
            console.error('Erro ao recuperar as URLs das imagens:', error);
            setlogoImageUrl("https://i.imgur.com/ithUisk.png");
        }
    }


    const openMaps = () => {
        const formattedAddres = endereco.replace(' ', '+');

        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddres}`;

        Linking.openURL(mapsUrl)
    }

    const openTelefone = () => {
        const numeroFormatado = telefone.replace(/[^0-9]/g, '');
        const url = `tel:${numeroFormatado}`;
        Linking.openURL(url);
    };

    function formatTelefone(telefone) {
        if (telefone && telefone.length === 11) {
            const telefoneFormatado = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7)}`;
            return telefoneFormatado;
        } else {
            return telefone;
        }
    }

    const telefoneFormatado = formatTelefone(telefone || '');

    return (

        <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode='never'
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.Chevron}
                        onPress={() => navigation.pop(1)}>
                        <Icon name='chevron-back' size={30} color='#000' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    >
                        <Text style={{ fontSize: 18 }}>
                            Seu Endereço
                        </Text>
                        <Icon name='chevron-down' size={30} color='#000' />
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name='notifications' size={30} color='#ffc000' />
                    </TouchableOpacity>
                </View>
                <View style={{ borderRadius: 10, overflow: 'hidden', width: '100%' }}>
                    <TouchableOpacity
                        onPress={() => chooseImageFromGallery('banner')}
                    >
                        <ImageBackground
                            source={{ uri: bannerImageUrl }}
                            style={styles.imageBackground}>
                            <View style={styles.user}>
                                <TouchableOpacity
                                    onPress={() => chooseImageFromGallery('logo')}
                                >
                                    <View style={styles.userImg}>
                                        <Image
                                            style={{ width: '100%', height: '100%' }}
                                            source={{ uri: logoImageUrl }} />
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.userInfo}>
                                    <Text style={styles.userInfo}>{nome}</Text>
                                </View>
                            </View>
                        </ImageBackground>

                    </TouchableOpacity>

                </View>

                <View style={styles.btnArea}>
                    <TouchableOpacity
                        onPress={openMaps}
                        style={styles.button}>
                        <Icon name='location' size={30} color='#000' />
                        <Text style={styles.btnText}>Endereço {'\n'} {endereco} N°{numero}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={openTelefone}
                        style={styles.button}
                    >
                        <Icon name='call' size={30} color='#000' />
                        <Text style={styles.btnText}>Telefone {'\n'} {formatTelefone(telefone)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonZap}
                        onPress={() => Linking.openURL(`https://wa.me/55${whatsapp}`)}
                    >
                        <Text style={styles.btnZapText}>Entrar em contato via Whatsapp</Text>
                        <Icon name='logo-whatsapp' size={30} color='#000' />
                    </TouchableOpacity>
                </View>
                <LogoutModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </View>
        </ScrollView >
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
        justifyContent: 'space-between',
        padding: 5,
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
        backgroundColor: '#fff',
        marginRight: 20,
        width: 140,
        height: 140,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
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
