import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ImageBackground, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import LogoutModal from '../../components/loadingModal';
import * as Linking from 'expo-linking';
import * as Clipboard from 'expo-clipboard';
export default function EditarPerfil({ route }) {
    const [copiedText, setCopiedText] = useState('');

    const copyToClipboard = async () => {
        console.log("fui clicado")
        // await Clipboard.setStringAsync('hello world');
    };

    const fetchCopiedText = async () => {
        console.log("clicado foi")
        // const text = await Clipboard.getStringAsync();
        //setCopiedText(text);
    };
const teste = async()=>{
    console.log("fui clicado")
}
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerBell}><Icon name='notifications' size={30} color='#ffc000' onPress={teste} /></TouchableOpacity>
            </View>
            <Button title="Copy to Clipboard" onPress={copyToClipboard} />
            <View style={styles.space} />
            <Button title="View Copied Text" onPress={fetchCopiedText} />
            <Text>{copiedText}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    button: {
        marginBottom: 10, // Adiciona espaço entre os botões
    },
    space: {
        height: 10, // Adiciona um espaço vertical entre os botões
    },
});