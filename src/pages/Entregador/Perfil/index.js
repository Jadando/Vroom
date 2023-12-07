import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import LogoutModal from '../../../components/logoutModal';
import { getFirestore, onSnapshot, doc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadString } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';



export default function PerfilEntregador({ route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [IdentificadorEntregador, setIdentificador] = useState(route.params?.IdentificadorEntregador || '');
    const [nameuser, setNameUser] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const navigation = useNavigation();
    const tema = useTheme();
    const styles = getstyles(tema);

    const db = getFirestore();
    const storage = getStorage();

    useEffect(() => {
        const docRef = doc(db, "users", IdentificadorEntregador);

        onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                const userData = doc.data();
                setNameUser(userData.nome);
            } else {
                console.log("O documento não existe.");
            }
        });

        DonwloadImage()

    }, [IdentificadorEntregador]);

    async function DonwloadImage() {
        try {
            const imageRef = ref(storage, `images/users/entregador/${IdentificadorEntregador}/profile_picture`);
            const url = await getDownloadURL(imageRef);
            const response = await fetch(url);
            const data = await response.text();
            const numericArray = data.split(",");
            const asciiString = numericArray.map((numericValue) => String.fromCharCode(parseInt(numericValue))).join("");
            setImageUrl('data:image/jpeg;base64,' + asciiString);
            //console.log(imageUrl)
        } catch (error) {
            console.error('Erro ao recuperar a URL da imagem:', error);
            setImageUrl("https://i.imgur.com/ithUisk.png");
        }
    }


    const chooseImageFromGallery = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                console.error('A permissão para acessar a galeria foi negada');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync();

            if (!result.canceled) {
                const localUri = result.assets[0].uri;
                //Lê o arquivo da imagem como uma string base64 diretamente
                const imageFile = await FileSystem.readAsStringAsync(localUri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                //Armazena a string base64 na variável de estado imageUrl
                const storageRef = ref(storage, `images/users/entregador/${IdentificadorEntregador}/profile_picture`);
                uploadImageToFirebase(storageRef, imageFile);
            }
        } catch (error) {
            console.error('Erro ao escolher a imagem:', error);
        }
    };

    const uploadImageToFirebase = async (storageRef, imageUrl) => {
        try {
            uploadString(storageRef, imageUrl).then((snapshot) => {
                console.log('Imagem upada com sucesso');
                DonwloadImage()
            },
            );
        } catch (error) {
            console.error('Erro ao enviar o arquivo:', error);
        }
    };
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
                    <TouchableOpacity onPress={chooseImageFromGallery}>
                        <View style={styles.userImg}>
                            <Image source={{ uri: imageUrl }} style={{ width: 110, height: 110 }} />
                        </View>
                    </TouchableOpacity>


                    <Text style={styles.userInfo}>{nameuser}</Text>
                </View>

                <View style={styles.btnArea}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => navigation.navigate('DadosEntregador', {
                            IdentificadorEntregador
                        })}>
                        <Text style={styles.btnText}>Meus dados</Text>
                        <Icon name='information' size={30} color='#000' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => navigation.navigate('EmpresasAfiliadas', { IdentificadorEntregador })}>
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