import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


export default function Historico() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerBell}><Icon name='notifications' size={30} color='#ffc000' /></TouchableOpacity>
            </View>

            <View style={styles.pedidos}>
                <Text style={styles.pedidosText}>Histórico de entregas</Text>
                <View style={styles.pedidosClock}>
                    <Icon name='time-outline' size={30} color='#000' />
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
            >
                <View style={styles.recents}>
                    <View style={styles.recentsContainer}>
                        <View style={styles.recentsContent}>
                            <View style={styles.recentsImages}>
                            </View>
                            <Text>
                                Luzia Hamburgers {'\n'}
                                Ultimo pedido dia: 11/04/2023
                            </Text>
                        </View>
                        <View style={styles.recentsContent}>
                            <View style={styles.recentsImages}>
                            </View>
                            <Text>
                                Mix Shakes {'\n'}
                                Ultimo pedido dia: 09/04/2023
                            </Text>
                        </View>
                        <View style={styles.recentsContent}>
                            <View style={styles.recentsImages}>
                            </View>
                            <Text>
                                JusFarma {'\n'}
                                Ultimo pedido dia: 28/03/2023
                            </Text>
                        </View>
                    </View>
                </View>
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
        backgroundColor: '#ffffffff'
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
        fontSize: 20,
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
        fontSize: 20
    },
    pedidosClock: {
        marginLeft: 10
    },
    recents: {
        alignSelf: 'flex-start',
        height: 1000
    },
    recentsTitle: {
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 10
    },
    recentsContainer: {
        flex: 1,
        alignSelf: 'center',
        margin: 20,
        width: '100%',
        marginBottom: 100
    },
    recentsContent: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        elevation: 2,
        padding: 20,
        width: 320,
        height: 80,
        borderRadius: 10,
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    recentsImages: {
        borderRadius: 50,
        padding: 10,
        backgroundColor: '#fff',
        width: 70,
        height: 70,
        marginRight: 10,
    },
})