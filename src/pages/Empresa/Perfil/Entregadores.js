import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInputMask } from 'react-native-masked-text';

export default function Entregadores() {
    const [cpf, setCpf] = useState('11111111111');
    const [nome, setNome] = useState('Joao');
    const [nasc, setNasc] = useState('25121998');
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
            >
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                    <Text style={styles.recentsTitle}>
                        Entregadores
                    </Text>
                    <Icon name='bicycle' size={30} color='#000' />
                </View>
                <View style={styles.card}>
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
                            value={nasc}
                            editable={false}
                            placeholder="Data de nascimento"
                        />
                        <View style={styles.buttons}>
                            <TouchableOpacity
                                style={styles.cadastrar}
                            >
                                <Text style={styles.cadastrarText}>Desvincular entregador</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: 20, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18 }}>Adicionar novo entregador</Text>
                        <View style={styles.icon}>
                            <Icon name='add' size={20} color='#000' />
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        felx: 1,
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        backgroundColor: '#fff',
        height: '100%',
    },
    recentsTitle: {
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 10,
        color: '#000'
    },
    card: {
        backgroundColor: '#e5e5e5',
        borderRadius: 10,
        marginTop: 15,
        padding: 15,
        elevation: 2,
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
        height: 60,
        width: '50%',
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
        textAlign: 'center'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    icon: {
        padding: 5,
        borderRadius: 50,
        backgroundColor: '#e5e5e5',
        marginLeft: 15
    },
})
