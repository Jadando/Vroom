import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { collection, addDoc, getFirestore } from "firebase/firestore";

export default function ClienteRevisa({ route }) {
    const navigation = useNavigation();

    const [nome, setNome] = useState(route.params?.nome || '');
    const [telefone, setTelefone] = useState(route.params?.telefone || '');
    const [cep, setCep] = useState(route.params?.cep || '');
    const [estado, setEstado] = useState(route.params?.estado || '');
    const [cidade, setCidade] = useState(route.params?.cidade || '');
    const [bairro, setBairro] = useState(route.params?.bairro || '');
    const [endereco, setEndereco] = useState(route.params?.endereco || '');
    const [numero, setNumero] = useState(route.params?.numero || '');
    async function verificaInput() {
        if (
            nome !== '' &&
            telefone !== '' &&
            cep !== '' &&
            estado !== '' &&
            cidade !== '' &&
            bairro !== '' &&
            endereco !== '' &&
            numero !== ''
        ) {
            const db = getFirestore()
            try {
                await addDoc(collection(db, "users"), {
                    nome: nome,
                    telefone: telefone,
                    cep: cep,
                    estado: estado,
                    cidade: cidade,
                    bairro: bairro,
                    endereco: endereco,
                    numero: numero,
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }

        } else {
            alert('Campos obrigatórios não preenchidos');
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.headerContentCircleInative}>
                        <Text style={styles.headerCircleNumber}>
                            {' '}
                            1 {' '}
                        </Text>
                    </View>
                    <Text style={styles.headerText}>Informações</Text>
                </View>
                <View style={styles.separador}>
                    <View style={styles.separadorLinha}></View>
                </View>
                <View style={styles.headerContent}>
                    <View style={styles.headerContentCircle}>
                        <Text style={styles.headerCircleNumber}>
                            {' '}
                            2 {' '}
                        </Text>
                    </View>
                    <Text style={styles.headerText}>Revisão</Text>
                </View>
            </View>

            <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>
                    Por favor revise suas Informações antes de concluir o cadastro
                </Text>
                <View style={styles.main}>
                    <TextInput
                        style={styles.input}
                        value={nome}
                        onChangeText={setNome}
                        placeholder="Nome completo"
                    />
                    <TextInputMask
                        style={styles.input}
                        type={'cel-phone'}
                        value={telefone}
                        onChangeText={(formatted, value) => {
                            setTelefone(value);
                        }}
                        placeholder="Telefone"
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) ',
                        }}
                    />
                    <TextInputMask
                        style={styles.input}
                        type={'zip-code'}
                        value={cep}
                        onChangeText={(formatted, value) => {
                            setCep(value);
                        }}
                        placeholder="CEP"
                    />
                    <TextInput
                        style={styles.input}
                        value={estado}
                        onChangeText={setEstado}
                        placeholder="Estado"
                    />
                    <TextInput
                        style={styles.input}
                        value={cidade}
                        onChangeText={setCidade}
                        placeholder="Cidade"
                    />
                    <TextInput
                        style={styles.input}
                        value={bairro}
                        onChangeText={setBairro}
                        placeholder="Bairro"
                    />
                    <TextInput
                        style={styles.input}
                        value={endereco}
                        onChangeText={setEndereco}
                        placeholder="Endereço"
                    />
                    <TextInput
                        style={styles.input}
                        value={numero}
                        onChangeText={setNumero}
                        placeholder="Número"
                    />

                    <View style={styles.buttons}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('CadastroCliente')}
                            style={styles.cadastrar}
                        >
                            <Text style={styles.cadastrarText}>Voltar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={verificaInput} style={styles.cadastrar}>
                            <Text style={styles.cadastrarText}>Concluir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    header: {
        backgroundColor: '#f2f2f2',
        width: '100%',
        height: 130,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    headerContent: {
        flexDirection: 'column',
        marginTop: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 20,
    },
    headerContentCircle: {
        borderRadius: 50,
        borderWidth: 2,
        padding: 10,
        marginBottom: 5,
        borderWidth: 3,
        backgroundColor: '#fff',
    },
    headerContentCircleInative: {
        borderRadius: 50,
        borderWidth: 2,
        padding: 10,
        marginBottom: 5,
        borderWidth: 3,
        backgroundColor: '#e6e4df',
    },
    headerCircleNumber: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    separador: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '60%',
        marginLeft: -41,
        marginRight: -3,
        marginBottom: 20,
    },
    separadorLinha: {
        flex: 1,
        borderBottomWidth: 3,
        alignSelf: 'center',
        elevation: 1,
    },
    headerText: {
        fontSize: 15,
        textAlign: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
        alignSelf: 'center',
        textAlign: 'center',
        margin: 15,
    },
    main: {
        marginTop: 50,
        alignSelf: 'center',
    },
    input: {
        fontSize: 18,
        padding: 5,
        paddingLeft: 15,
        margin: 5,
        marginLeft: 15,
        width: 300,
        borderBottomWidth: 1,
        marginBottom: 30,
    },
    cadastrar: {
        height: 50,
        width: '40%',
        alignSelf: 'center',
        backgroundColor: '#ffc000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 30,
        padding: 5,
    },
    cadastrarText: {
        fontSize: 18,
        color: '#121212',
        fontWeight: 'bold',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
