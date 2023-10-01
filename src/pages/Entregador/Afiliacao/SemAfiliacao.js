import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SemAfiliacao() {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerBell}><Icon name='notifications' size={30} color='#ffc000' /></TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>Empresas Afiliadas</Text>
            <Icon name='business' size={30} color='#00'/>
            </View>
            <Text style={styles.content}>Você não tem afiliação com {'\n'} nenhuma empresa</Text>
            <Icon name='sad-outline' size={50} color='#000'/>        
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        marginTop: '5%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 20,
        marginBottom: 30
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 70
    },
    headerBell: {
        marginLeft: '90%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginRight: 10,
    },
    content: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 15
    },
});
