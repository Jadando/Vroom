import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import ChangeModal from '../../../../components/changeModal';
import { getFirestore, onSnapshot, doc } from "firebase/firestore";

export default function DadosEntregador({ route }) {
    const [modalVisible, setModalVisible] = useState(false)
    const [Identificador, setIdentificador] = useState(route.params?.Identificador || '');
    const navigation = useNavigation();
    const tema = useTheme();
    const styles = getstyles(tema);
    const [cpf, setCpf] = useState(null);
    const [nome, setNome] = useState(null);
    const [dtNasc, setDtNasc] = useState(null);
    const [telefone, setTelefone] = useState(null);
    const [cep, setCep] = useState(null);
    const [estado, setEstado] = useState(null);
    const [cidade, setCidade] = useState(null);
    const [bairro, setBairro] = useState(null);
    const [endereco, setEndereco] = useState(null);
    const [numero, setNumero] = useState(null);

    useEffect(() => {
        const db = getFirestore();
        const docRef = doc(db, "usuario", "tabela", "entregador", Identificador);

        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                const userData = doc.data();
                setCpf(userData.cpf)
                setNome(userData.nome);
                setTelefone(userData.telefone);
                setCep(userData.cep);
                setEstado(userData.estado);
                setCidade(userData.cidade);
                setBairro(userData.bairro);
                setEndereco(userData.endereco);
                setNumero(userData.numero);
                setDtNasc(userData.dtNasc)
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
        <View style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
            >
                <View style={styles.pedidos}>
                    <Text style={styles.pedidosText}>Meus dados</Text>
                    <View style={styles.pedidosClock}>
                        <Icon name='information-circle-outline' size={30} color='#000' />
                    </View>
                </View>
                <TextInputMask
                    style={styles.input}
                    type={'cpf'}
                    value={cpf}
                    placeholder="CPF"
                    editable={false}
                />
                <View style={styles.main}>
                    <TextInput
                        style={styles.input}
                        value={nome}
                        editable={false}
                        placeholder="Nome completo"
                    />
                    <TextInputMask
                        style={styles.input}
                        type={'datetime'}
                        value={dtNasc}
                        editable={false}
                        placeholder="Data de nascimento"
                    />
                    <TextInputMask
                        style={styles.input}
                        type={'cel-phone'}
                        value={telefone}
                        editable={false}
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
                        editable={false}
                        placeholder="CEP"
                    />
                    <TextInput
                        style={styles.input}
                        value={estado}
                        editable={false}
                        placeholder="Estado"
                    />
                    <TextInput
                        style={styles.input}
                        value={cidade}
                        editable={false}
                        placeholder="Cidade"
                    />
                    <TextInput
                        style={styles.input}
                        value={bairro}
                        editable={false}
                        placeholder="Bairro"
                    />
                    <TextInput
                        style={styles.input}
                        value={endereco}
                        editable={false}
                        placeholder="Endereço"
                    />
                    <TextInput
                        style={styles.input}
                        value={numero}
                        editable={false}
                        placeholder="Número"
                    />
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            onPress={() => navigation.pop(1)}
                            style={styles.cadastrar}
                        >
                            <Text style={styles.cadastrarText}>Voltar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AlterarEntregador')}
                            style={styles.cadastrar}
                        >
                            <Text style={styles.cadastrarText}>Alterar dados</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ChangeModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </ScrollView>
        </View>
    );
}

const getstyles = (tema) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 30,
    },
    pedidos: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        justifyContent: 'center',
        marginBottom: 15,
    },
    pedidosText: {
        fontSize: 20,
        color: '#000'
    },
    pedidosClock: {
        marginLeft: 10,
    },
    main: {
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
        backgroundColor: '#ffc000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 30,
        padding: 5,
    },
    cadastrarText: {
        fontSize: 17,
        color: '#121212',
        fontWeight: '600',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

});
