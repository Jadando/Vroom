import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, useColorScheme, ToastAndroid, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection, where } from "firebase/firestore";
import { useTheme } from 'styled-components';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as App from "../../firebaseConnection";

WebBrowser.maybeCompleteAuthSession()

export default function Login() {
    const navigation = useNavigation();
    const tema = useTheme();
    const styles = getstyles(tema);
    const [email, setEmail] = useState('empresa@gmail.com');
    const [senha, setSenha] = useState('123456');
    const [UserGoogle, SetUserGoogle] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '550744668475-82l8k7cubo8tt1jqfn3clneu0hjrhdmj.apps.googleusercontent.com',
    });

    useEffect(() => {
        handledSingInWithGoogle()
    }, [response])

    async function handledSingInWithGoogle() {
        const user = await AsyncStorage.getItem("@user");
        if (!user) {
            if (response?.type === "success") {
                await getUserInfo(response.authentication.accessToken);
            }
        } else {
            SetUserGoogle(JSON.parse(user));
        }
    }

    const getUserInfo = async (token) => {
        if (!token) return;
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const user = await response.json();
            await AsyncStorage.setItem("@user", JSON, stringify(user));
            SetUserGoogle(user);
        } catch (error) {
            console.log("erro")
        }
    }
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    async function validarLogin() {
        if (email !== '' && senha !== '') {
            //navigation.navigate('Home');
            if (validarEmail(email)) {
                const auth = getAuth();
                const db = getFirestore();
                signInWithEmailAndPassword(auth, email, senha)
                    .then(async (userCredential) => {
                        const user = userCredential.user;
                        const uide = user.uid
                        const processarConsulta = (snapshot, dataArray, navigateCallback) => {
                            snapshot.forEach((doc) => {
                              const data = doc.data();
                              dataArray.push({ id: doc.id, ...data });
                              if (doc.id === uide) {
                                navigateCallback(); // Chama a função de navegação
                              }
                            });
                          };
                        try {
                            const [clienteSnapshot, empresaSnapshot, entregadorSnapshot] = await Promise.all([
                              getDocs(collection(db, "usuario/tabela/cliente"),where('id', '==', uide)),
                              getDocs(collection(db, "usuario/tabela/empresa"),where('id', '==', uide)),
                              getDocs(collection(db, "usuario/tabela/entregador"),where('id', '==', uide)),
                            ]);
                      
                            const dataArrayCliente = [];
                            const dataArrayEmpresa = [];
                            const dataArrayEntregador = [];
                      
                            // Processar os resultados de cada consulta
                            processarConsulta(clienteSnapshot, dataArrayCliente, () => {
                              navigation.navigate('Home'); // Substitua 'NomeDaTelaCliente' pelo nome da tela de cliente
                            });
                            processarConsulta(empresaSnapshot, dataArrayEmpresa, () => {
                              navigation.navigate('IniciarEntrega'); // Substitua 'NomeDaTelaEmpresa' pelo nome da tela de empresa
                            });
                            processarConsulta(entregadorSnapshot, dataArrayEntregador, () => {
                              navigation.navigate('Pendentes'); // Substitua 'NomeDaTelaEntregador' pelo nome da tela de entregador
                            });
                      
                            // ...
                          } catch (error) {
                            console.error("Erro ao executar as consultas:", error);
                          }
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode)
                        console.log(errorMessage)
                    });
            }
            else {
                alert("email ou senha incorreto")
            }
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
            >
                <View style={styles.logoTop}>
                    <Image source={require('../../img/logo.png')} />
                </View>
                <Text>{JSON.stringify(UserGoogle, null, 2)}</Text>
                <Button title="sair da conta" onPress={() => AsyncStorage.removeItem("@user")}></Button>
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
                    onPress={validarLogin}>
                    <Text style={styles.logarText}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.separador}>
                    <View style={styles.separadorLinha}></View>
                    <Text style={{ fontSize: 20, elevation: 1 }}>{''} ou {''}</Text>
                    <View style={styles.separadorLinha}></View>
                </View>

                <View style={styles.loginLogos}>
                    <TouchableOpacity disabled={!request} onPress={() => promptAsync()}>
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
        flex: 1,
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
