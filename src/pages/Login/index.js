import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, useColorScheme, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, getDocs, collection, where, query, setDoc, doc } from "firebase/firestore";
import { useTheme } from 'styled-components';
import * as App from "../../firebaseConnection";
import LoadingModal from '../../components/loadingModal';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {
    const navigation = useNavigation();
    const tema = useTheme();
    const styles = getstyles(tema);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('joao.adriano20056@gmail.com');
    const [senha, setSenha] = useState('123456');
    const [tipoUser, setTipoUser] = useState(null)
    const auth = getAuth();
    const db = getFirestore();
    const salvarDadosLocalmente = async (chave, valor) => {
        try {
            await AsyncStorage.setItem(chave, valor);
        } catch (error) {
            console.error('Erro ao salvar dados localmente:', error);
        }
    };

    const carregarDadosLocalmente = async (chave) => {
        try {
            const valor = await AsyncStorage.getItem(chave);
            if (valor !== null) {
                setTipoUser(valor);
            }
        } catch (error) {
            console.error('Erro ao carregar dados localmente:', error);
        }
    };
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    async function validarLogin() {
        //  setIsLoading(true);
        if (email !== '' && senha !== '') {
            //   setIsLoading(true);
            if (validarEmail(email)) {
                signInWithEmailAndPassword(auth, email, senha)
                    .then(async (userCredential) => {
                        setIsLoading(true);
                        const user = userCredential.user;
                        const uide = user.uid
                        //console.log(uide)
                        try {

                            // Suponha que 'db' seja a instância do Firestore
                            const tipos = ['cliente', 'empresa', 'entregador'];

                            // Construa a consulta
                            const q = query(collection(db, 'users'), where('id', '==', uide), where('tipo', 'in', tipos));

                            // Execute a consulta
                            getDocs(q)
                                .then((querySnapshot) => {
                                    querySnapshot.forEach((doc) => {
                                        const tipo = doc.data().tipo;
                                        // console.log(`Documento ID: ${doc.id} e tipo: ${tipo}`);
                                        switch (tipo) {
                                            case 'cliente':
                                                //setIsLoading(false);
                                                setTipoUser(tipo)
                                                salvarDadosLocalmente('tipoUser', tipo);
                                                navigation.navigate('Home', {
                                                    IdentificadorCliente: uide
                                                });
                                                break;
                                            case 'empresa':
                                                //setIsLoading(false);
                                                setTipoUser(tipo)
                                                salvarDadosLocalmente('tipoUser', tipo);
                                                navigation.navigate('IniciarEntrega', {
                                                    IdentificadorEmpresa: uide
                                                });
                                                break;
                                            case 'entregador':
                                                //setIsLoading(false);
                                                setTipoUser(tipo)
                                                salvarDadosLocalmente('tipoUser', tipo);
                                                navigation.navigate('Pendentes', {
                                                    IdentificadorEntregador: uide
                                                });
                                                break;
                                            default:
                                                // alert("Não exite conta com esse email")
                                                break;
                                        }

                                    });
                                })
                                .catch((error) => {
                                    console.error("Erro ao executar a consulta:", error);
                                });

                            setIsLoading(false);

                        } catch (error) {
                            setIsLoading(false);
                            console.error("Erro ao executar as consultas:", error);
                        }
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode)
                        console.log(errorMessage)
                        // if (errorCode === 'auth/invalid-login-credentials') {
                        //     alert("teste")
                        // }
                    });
            }
            else {
                setIsLoading(false);
                alert("email ou senha incorreto")
            }
            setIsLoading(false);
        }
    }
    // onAuthStateChanged(auth, (user) => {
    //     // setIsLoading(true)
    //     carregarDadosLocalmente('tipoUser');
    //     if (user) {
    //         // User is signed in, see docs for a list of available properties
    //         // https://firebase.google.com/docs/reference/js/auth.user
    //         const uid = user.uid;
    //         console.log(" id do usuario: " + uid)
    //         console.log("Esse eo tipo do usuario: " + tipoUser)
    //         switch (tipoUser) {
    //             case 'cliente':
    //                 setIsLoading(false);
    //                 navigation.navigate('Home', {
    //                     IdentificadorCliente: uid
    //                 });
    //                 break;
    //             case 'empresa':
    //                 navigation.navigate('IniciarEntrega', {
    //                     IdentificadorEmpresa: uid
    //                 });
    //                 break;
    //             case 'entregador':
    //                 navigation.navigate('Pendentes', {
    //                     IdentificadorEntregador: uid
    //                 });
    //                 break;
    //             default:
    //                 // alert("Não exite conta com esse email")
    //                 break;
    //         }
    //         //setIsLoading(false)
    //         // ...
    //     } else {
    //         // User is signed out
    //         // ...
    //     }
    // });

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
            >
                <View style={styles.logoTop}>
                    <Image source={require('../../img/logo.png')} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputEmail}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType='email-address'
                        placeholder="Email"
                    />
                    <TextInput
                        style={styles.inputSenha}
                        secureTextEntry={true}
                        value={senha}
                        onChangeText={(text) => setSenha(text)}
                        placeholder="Senha"
                    />
                </View>
                <TouchableOpacity style={styles.recuperarSenha}>
                    <Text>Esqueceu a senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.logar}
                    onPress={() => { validarLogin(); setIsLoading(true); }}>
                    <Text style={styles.logarText}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.separador}>
                    <View style={styles.separadorLinha}></View>
                    <Text style={{ fontSize: 20, elevation: 1 }}>{''} ou {''}</Text>
                    <View style={styles.separadorLinha}></View>
                </View>

                <View style={styles.loginLogos}>
                    <TouchableOpacity onPress={() => promptAsync()}>
                        <Image style={{ width: 40, height: 40 }} source={require('../../img/google.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image style={{ width: 40, height: 40 }} source={require('../../img/face.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image style={{ width: 40, height: 40 }} source={require('../../img/apple.png')} />
                    </TouchableOpacity>
                </View>
                <Text style={{ alignSelf: 'center', fontSize: 18 }}>Não possui conta?</Text>
                <TouchableOpacity
                    style={{ alignSelf: 'center' }}
                    onPress={() => navigation.navigate('Cadastro')}
                >
                    <Text style={{ fontSize: 18 }}>Cadastre-se</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.copy}>
                        Copyright © 2023 Data Explores {'\n'}
                        todos direitos reservados
                    </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                </View>
                <LoadingModal visible={isLoading} />
            </ScrollView>
        </View>
    );
};

const getstyles = (tema) => StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '10%',
        backgroundColor: '#fff'
    },
    logoTop: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        alignItems: 'center',
    },
    inputEmail: {
        fontSize: 18,
        padding: 5,
        paddingLeft: 15,
        margin: 5,
        marginLeft: 15,
        width: 300,
        borderBottomWidth: 1,
        marginBottom: 30,
    },
    inputSenha: {
        fontSize: 18,
        padding: 5,
        paddingLeft: 15,
        margin: 5,
        marginLeft: 15,
        width: 300,
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    recuperarSenha: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 50,
        marginBottom: 30,
    },
    logar: {
        height: 50,
        width: 250,
        backgroundColor: '#ffc000',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    logarText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separador: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: 300,
        marginBottom: 15,
        marginTop: 15,
    },
    separadorLinha: {
        flex: 1,
        borderBottomWidth: 1.5,
        alignSelf: 'center',
        elevation: 1,
    },
    loginLogos: {
        width: 300,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    footer: {
        height: 230,
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        paddingBottom: 15
    },
    copy: {
        marginTop: 5,
        textAlign: 'center',
        fontSize: 15
    },
});
