import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import ChangeModal from '../../../../components/changeModal';

export default function DadosEntregador() {
    const [modalVisible, setModalVisible] = useState(false)
    const navigation = useNavigation();
    const tema = useTheme();
    const styles = getstyles(tema);
    const [cpf, setCpf] = useState('11111111111');
    const [nome, setNome] = useState('Agostinho Carrara');
    const [dtNasc, setDtNasc] = useState('23/09/1990');
    const [telefone, setTelefone] = useState('1344809900');
    const [cep, setCep] = useState('11111111');
    const [estado, setEstado] = useState('SP');
    const [cidade, setCidade] = useState('Mongaguá');
    const [bairro, setBairro] = useState('Agenor de Campos');
    const [endereco, setEndereco] = useState('Rua Aimorés');
    const [numero, setNumero] = useState('11111111111');


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
                           onPress={()=> navigation.navigate('PerfilEntregador')}
                            style={styles.cadastrar}
                        >
                            <Text style={styles.cadastrarText}>Voltar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                             onPress={()=> navigation.navigate('AlterarEntregador')}
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
