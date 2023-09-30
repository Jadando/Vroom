import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import * as Location from 'expo-location';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoiZGF0YWV4cGxvcmVycyIsImEiOiJjbG1qOWc5MzMwMWZuMnNyeDZwczdibTdmIn0.xyo6WcixY-D5MiT2SfZj5Q');

export default function Drop() {
    const navigation = useNavigation();
    const tema = useTheme();
    const styles = getstyles(tema);
    const [location, setLocation] = useState(null);
    console.log(location)
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerContent}>
                    <Text style={styles.title}>
                        Seu endereço
                    </Text>
                    <Icon name='chevron-down' size={30} color={tema.Tema.color} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerBell}><Icon name='notifications' size={30} color='#ffc000' /></TouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
            >
                <View style={styles.Retangulo}>
                    <View style={styles.recents}>
                        <View style={styles.recentsContainer2}>
                            <View style={styles.recentsContent}>
                                <View style={styles.recentsImages}>
                                </View>
                                <Text style={styles.Text}>
                                    JusFarma {'\n'}
                                    Cd pedido: 01
                                </Text>
                            </View>
                            <View style={styles.pedidos}>
                                <Text style={styles.pedidosText}>Sua entrega</Text>
                                <View style={styles.pedidosClock}>
                                    <Icon name='location' size={30} color={tema.Tema.color} />
                                </View>
                            </View>
                            <View style={styles.page}>
                                <View style={styles.MapsContainer}>
                                    <Mapbox.MapView style={styles.map} region={{
                                            latitude: location ? location.coords.latitude : 0,
                                            longitude: location ? location.coords.longitude : 0,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }}
                                    >
                                        {location && (
                                            <MapView.Marker
                                                coordinate={{
                                                    latitude: location.coords.latitude,
                                                    longitude: location.coords.longitude,
                                                }}
                                                title="Minha localização"
                                            />
                                        )}


                                    </Mapbox.MapView>
                                </View>
                            </View>
                            <View style={styles.recentsContent2}>
                                <View style={styles.recentsImages}>
                                </View>
                                <Text style={styles.Text}>
                                    JusFarma {'\n'}
                                    Cd pedido: 01
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.pedidos}>
                    <Text style={styles.pedidosText}>Histórico de pedidos</Text>
                    <View style={styles.pedidosClock}>
                        <Icon name='time-outline' size={30} color={tema.Tema.color} />
                    </View>
                </View>

                <View style={styles.recents}>
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
    Retangulo: {
        backgroundColor: 'Ffc000',
        width: '100%',
        height: '31%',
        borderRadius: 20,
        elevation: 2,
        padding: 15,
        paddingTop: 20,
        paddingBottom: 10
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
    recentsContainer2: {
        flex: 1,
        alignSelf: 'center',
        margin: 20,
        width: '100%',
        marginBottom: 500,
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
        marginBottom: 20,
    },
    recentsContent2: {
        flexDirection: 'row',
        backgroundColor: tema.Tema.content,
        padding: 20,
        width: 320,
        height: 80,
        borderRadius: 10,
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: -80,
        marginTop: 90,
    },
    recentsImages: {
        borderRadius: 50,
        padding: 10,
        backgroundColor: '#fff',
        width: 70,
        height: 70,
        marginRight: 10,
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    MapsContainer: {
        height: 300,
        width: 300,
        marginTop: 70,
    },
    map: {
        flex: 1
    }
})