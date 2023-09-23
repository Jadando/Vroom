import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


export default function Config() {
    const navigation = useNavigation();
    return (

        <View style={styles.container}>
            <View style={styles.config}>
                <Text style={styles.configText}>Configurações</Text>
                <Icon name='cog' size={30} color='#000' />
            </View>

            <View style={styles.btnArea}>
                <Text style={styles.configContent}>
                    Tema
                </Text>
                <View style={styles.tema}>
                <TouchableOpacity style={styles.btnTema}>
                <Icon name='sunny' size={30} color='#000' />
                    <Text style={styles.btnText}>Claro</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnTema}>
                <Icon name='moon' size={30} color='#000' />
                    <Text style={styles.btnText}>Escuro</Text>
                </TouchableOpacity>
                </View>
                <Text style={styles.configContent}>
                    Senha
                </Text>
                <TouchableOpacity 
                style={styles.button}>
                    <Text style={styles.btnText}>Alterar senha</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        felx: 1,
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        backgroundColor: '#fff'
    },
    config: {
        marginTop: 50,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    configText: {
        fontSize: 20,
        marginRight: 15
    },
    configContent:{
        fontSize: 18,
        marginBottom: 20,
},
    btnArea: {
        marginTop: 100,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    btnTema: {
        flexDirection: 'row',
        marginBottom: 30,
        backgroundColor: '#ffc000',
        borderRadius: 10,
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',
        width: '40%',
        marginRight: 20,
        height: 60,
        justifyContent: 'center',
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
    },
    btnText: {
        fontSize: 18,
        marginLeft: 10,
    },
    tema: {
        flexDirection: 'row'
    },
})