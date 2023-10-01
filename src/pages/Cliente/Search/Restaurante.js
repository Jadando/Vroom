import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';

export default function Search() {
    const tema = useTheme();
    const styles = getstyles(tema);
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerContent}>
                    <Text style={styles.title}>
                        Seu endereço
                    </Text>
                    <Icon name='chevron-down' size={30} color ={tema.Tema.color}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerBell}><Icon name='notifications' size={30} color='#ffc000' /></TouchableOpacity>
            </View>

            <View style={styles.search}>
                <View style={styles.searchLupe}>
                    <Icon name='search' size={25} color={tema.Tema.color} />
                </View>
                <TextInput
                placeholder="Buscar estabelecimentos" 
                style={{fontSize: 18, color: tema.Tema.color }}
                placeholderTextColor={tema.Tema.color}
                />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
            >
                <View style={styles.recents}>
                    <Text style={styles.recentsTitle}>
                        Pedido Recentemente
                    </Text>
                    <View style={styles.recentsContainer}>
                        <View style={styles.recentsContent}>
                            <View style={styles.recentsImages}>
                            </View>
                            <Text style={styles.Text}>
                                Luzia Hamburgers {'\n'}
                                Ultimo pedido dia: 11/04/2023
                            </Text>
                        </View>
                        <View style={styles.recentsContent}>
                            <View style={styles.recentsImages}>
                            </View>
                            <Text style={styles.Text}>
                                Mix Shakes {'\n'}
                                Ultimo pedido dia: 09/04/2023
                            </Text>
                        </View>
                        <View style={styles.recentsContent}>
                            <View style={styles.recentsImages}>
                            </View>
                            <Text style={styles.Text}>
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

const getstyles = (tema) => StyleSheet.create({
    container: {
        felx: 1,
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        backgroundColor: tema.Tema.background
    },
    Text: {
        color: tema.Tema.color,
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
        alignSelf: 'flex-end'
    },
    title: {
        fontSize: 20,
        color: tema.Tema.color
    },
    search: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: tema.Tema.content,
        padding: 10,
        borderRadius: 10,
        width: '80%',
        marginBottom: 30,
    },
    searchLupe: {
        marginRight: 15,
    },
    recents: {
        alignSelf: 'flex-start',
        margin: 20,
    },
    recentsTitle: {
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 10,
        color: tema.Tema.color,
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
        backgroundColor: tema.Tema.content, 
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
