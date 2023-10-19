import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import ChangeModal from '../../../../components/changeModal';
import { getFirestore, doc, setDoc } from "firebase/firestore";

export default function AlterarEntregador({ route }) {
    const [modalVisible, setModalVisible] = useState(false)
    const navigation = useNavigation();
    const tema = useTheme();
    const styles = getstyles(tema);
    const [Identificador, setIdentificador] = useState(route.params?.Identificador || '');
    const [cpf, setCpf] = useState(route.params?.cpf || '');
    const [nome, setNome] = useState(route.params?.nome || '');
    const [dtNasc, setDtNasc] = useState(route.params?.dtNasc || '');
    const [telefone, setTelefone] = useState(route.params?.telefone || '');
    const [cep, setCep] = useState(route.params?.cep || '');
    const [estado, setEstado] = useState(route.params?.estado || '');
    const [cidade, setCidade] = useState(route.params?.cidade || '');
    const [bairro, setBairro] = useState(route.params?.bairro || '');
    const [endereco, setEndereco] = useState(route.params?.endereco || '');
    const [numero, setNumero] = useState(route.params?.numero || '');


    async function atualizarEntregador() {

        try {
            // Validation checks
            if (!nome || !telefone || !cep || !estado || !cidade || !bairro || !endereco || !numero) {
                console.error("Incomplete data. All fields must be filled.");
                return;
            }
            // Substitua com o UID desejado
            const db = getFirestore();

            const docRef = doc(db, "usuario/tabela/entregador", Identificador); // Crie uma referência ao documento com o UID específico

            const dados = {
                telefone: telefone,
                cep: cep,
                estado: estado,
                cidade: cidade,
                bairro: bairro,
                endereco: endereco,
                numero: numero
            };

            await setDoc(docRef, dados);
            await navigation.pop(1)

            console.log('Documento criado com sucesso'); // Redirecione ou faça o que desejar após criar o documento
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    return (
        <View style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
            >
                <View style={styles.pedidos}>
                    <Text style={styles.pedidosText}>Alterar dados</Text>
                    <View style={styles.pedidosClock}>
                        <Icon name='information-circle-outline' size={30} color='#000' />
                    </View>
                </View>
                <TextInputMask
                    style={styles.input}
                    type={'cpf'}
                    value={cpf}
                    editable={false}
                    placeholder="CPF"
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
                        onChangeText={setTelefone}
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
                        onChangeText={setCep}
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
                            onPress={() => navigation.pop(1)}
                            style={styles.cadastrar}
                        >
                            <Text style={styles.cadastrarText}>Voltar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            style={styles.cadastrar}
                        >
                            <Text style={styles.cadastrarText}>Confirmar alteração</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView >

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType='slide'
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderTitle}>Aviso</Text>
                        <TouchableOpacity
                            style={styles.modalHeaderClose}
                            onPress={() => setModalVisible(!modalVisible)} >
                            <Image source={require('../../../../img/close.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.modalContentTitle}>
                            Tem certeza que deseja alterar seus dados?
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
                                onPress={() => atualizarEntregador()}
                                style={styles.modalBtn}>
                                <Text style={styles.modalContent}>
                                    Sim
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
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
