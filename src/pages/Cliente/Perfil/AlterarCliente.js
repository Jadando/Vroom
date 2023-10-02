import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import ChangeModal from './../../../components/changeModal';


export default function AlterarCliente() {
    const [viewlVisible, setViewVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const navigation = useNavigation();
    const tema = useTheme();
    const styles = getstyles(tema);
    const [nome, setNome] = useState('João Adriano');
    const [telefone, setTelefone] = useState('1898180400');
    const [cep, setCep] = useState('11730000');
    const [estado, setEstado] = useState('sp');
    const [cidade, setCidade] = useState('sao paulo');
    const [bairro, setBairro] = useState('Agenor de Campos');
    const [endereco, setEndereco] = useState('Av. Monteiro Lobato');
    const [numero, setNumero] = useState('779');


    return (
        <View style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
            >
                <View style={styles.pedidos}>
                    <Text style={styles.pedidosText}>Alterar dados</Text>
                    <View style={styles.pedidosClock}>
                        <Icon name='information-circle-outline' size={30} color={'#000'} />
                    </View>
                </View>
                <View style={styles.main}>
                    <TextInput
                        style={styles.input}
                        value={nome}
                        editable={false}
                        placeholder="Nome completo"
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
                    <TouchableOpacity
                        onPress={() => setViewVisible(!viewlVisible)}
                        style={styles.address}>
                        <Icon name='add' size={20} color='#000' />
                        <Text style={{ textDecorationLine: 'none' }}>Adicionar segundo endereço</Text>
                    </TouchableOpacity>
                    {viewlVisible && (
                        <View style={styles.modalContainer}>

                            <Text style={[styles.pedidosText, { alignSelf: 'center', marginBottom: 5 }]}> Segundo endereço</Text>
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
                        </View>
                    )}
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('DadosCliente')}
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
    address: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: -20,
        borderBottomColor: '#000',
        borderBottomWidth: 0.7,
    },
});
