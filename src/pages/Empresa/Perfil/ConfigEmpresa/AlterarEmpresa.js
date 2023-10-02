import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import ChangeModal from '../../../../components/changeModal';

export default function AlterarEntregador() {
    const [modalVisible, setModalVisible] = useState(false)
    const navigation = useNavigation();
    const tema = useTheme();
    const styles = getstyles(tema);
    const [cnpj, setCnpj] = useState('35.123.000/0001-00');
    const [nome, setNome] = useState('Luizia hamburgueria');
    const [categoria, setCategoria] = useState('Restaurante');
    const [telefone, setTelefone] = useState('1999819006');
    const [cep, setCep] = useState('1173000');
    const [estado, setEstado] = useState('RJ');
    const [cidade, setCidade] = useState('Rio de Janeiro');
    const [bairro, setBairro] = useState('Cristo Redentor');
    const [endereco, setEndereco] = useState('Rua vicente casemiro');
    const [numero, setNumero] = useState('90');

    function aAlterarEntregador() {
        navigation.navigate('')
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
                        <Icon name='information-circle-outline' size={30} color={tema.Tema.color} />
                    </View>
                </View>
                <TextInputMask
                        style={styles.input}
                        type={'cnpj'}
                        value={cnpj}
                        editable={false}
                        placeholder="CNPJ"
                    />
                <View style={styles.main}>
                    <TextInput
                        style={styles.input}
                        value={nome}
                        editable={false}
                        placeholder="Nome completo"
                    />
                    <TextInput
                        style={styles.input}
                        value={categoria}
                        editable={false}
                        placeholder="Categoria"
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
                            onPress={() => navigation.navigate('DadosEmpresa')}
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
        color: tema.Tema.color
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
