import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Mapbox from '@rnmapbox/maps';
import * as Location from 'expo-location';

Mapbox.setAccessToken('pk.eyJ1IjoiZGF0YWV4cGxvcmVycyIsImEiOiJjbG1qOWc5MzMwMWZuMnNyeDZwczdibTdmIn0.xyo6WcixY-D5MiT2SfZj5Q');

export default function RastrearEmpresa() {
    const [heading, setHeading] = useState(0);
    const [iconRotation, setIconRotation] = useState(0);
    const [lastLocation, setLastLocation] = useState(null);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }
            const subscription = Location.watchPositionAsync({
                accuracy: Location.Accuracy.High,
                timeInterval: 5000,
                distanceInterval: 1,
            },
            (newLocation) => {
                if (location) {
                    const angle = calculateAngle(location.coords, newLocation.coords);
                    setIconRotation(angle);
                }
                setLocation(newLocation);
            });
            return () => subscription.remove();
        })();
    }, []);    

    function calculateAngle(coord1, coord2) {
        const deltaY = coord2.latitude - coord1.latitude;
        const deltaX = coord2.longitude - coord1.longitude;
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        return angle;
    }    
    const [location, setLocation] = useState(null);
    const [isMapExpanded, setIsMapExpanded] = useState(false);
    const handleMapPress = () => {
        setIsMapExpanded(!isMapExpanded);
    };
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode='never'
            scrollEnabled={!isMapExpanded}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerBell}><Icon name='notifications' size={30} color='#ffc000' /></TouchableOpacity>
                </View>


                <View style={styles.pedidos}>
                    <Text style={styles.pedidosText}>Entregas pendentes</Text>
                    <View style={styles.pedidosClock}>
                        <Icon name='time-outline' size={30} color='#000' />
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.recentsContent}>
                        <View style={styles.recentsImages}>
                        </View>
                        <Text>
                            Luzia Hamburgers {'\n'}
                            Cd pedido: 01
                        </Text>
                    </View>
                    <View style={styles.locTitle}>
                        <Text style={{ fontSize: 18 }}>Ver destino da entrega</Text>
                        <Icon name='location-sharp' size={30} color='#000' />
                    </View>
                    <View style={[styles.map, isMapExpanded ? styles.expandedMap : {}]}>
                        <Mapbox.MapView
                            styleURL="mapbox://styles/dataexplorers/cln3p09nw06mh01ma53j17ayq"
                            style={styles.mapMap}
                            scrollEnabled={isMapExpanded}
                            onPress={handleMapPress}
                        >
                            <Mapbox.Camera
                                zoomLevel={14}
                                centerCoordinate={location ? [location.coords.longitude, location.coords.latitude] : [-46.678747, -24.122155]}
                                followUserMode="normal"
                            />
                            {location && (
                                <Mapbox.PointAnnotation
                                    id="userLocation"
                                    coordinate={[location.coords.longitude, location.coords.latitude]}
                                >
                                    <View style={[styles.customMarker, { transform: [{ rotate: `${iconRotation}deg` }] }]}>
                                        <Icon name="bicycle" size={30} color="#ffc000" />
                                    </View>
                                    <Mapbox.Callout title="Minha localização" />
                                </Mapbox.PointAnnotation>
                            )}
                        </Mapbox.MapView>
                    </View>
                    <View style={styles.recentsContent}>
                        <View style={styles.recentsImages}>
                        </View>
                        <Text>
                            Nome do entregador{'\n'}
                            Agostinho Carrara
                        </Text>
                    </View>
                    <View style={styles.recentsContent}>
                        <View style={styles.recentsImages}>
                        </View>
                        <Text>
                            Nome do cliente {'\n'}
                            Pedro
                        </Text>
                    </View>
                    <View style={styles.comanda}>
                        <Text style={styles.comandaTitle}>Comanda do pedido:</Text>
                        <View style={styles.comandaDescription}>
                            <Text style={styles.comandaDescription}>
                                1 X-salada {'\n1'}
                                1 Coca cola 2L
                            </Text>
                        </View>
                        <Text style={styles.comandaTitle}>Forma de pagamento:</Text>
                        <View style={styles.comandaPaymentValue}>
                            <Text>
                                Dinheiro
                            </Text>
                        </View>
                        <Text style={styles.comandaTitle}>Valor do pedido:</Text>
                        <View style={styles.comandaPaymentValue}>
                            <Text>R$ 15,99</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',

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
    card: {
        backgroundColor: '#FFC000',
        height: 'fit-content',
        width: '90%',
        borderRadius: 8,
        padding: 10,
    },
    recentsContent: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        elevation: 2,
        padding: 20,
        height: 80,
        borderRadius: 10,
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    recentsImages: {
        borderRadius: 50,
        backgroundColor: '#fff',
        width: 70,
        height: 70,
        marginRight: 10,
    },
    comanda: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        elevation: 2,
        padding: 20,
        height: 'fit-content',
        borderRadius: 10,
    },
    comandaDescription: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        height: 'fit-content',
        padding: 10,
    },
    comandaPayment: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        height: 40,
        marginBottom: 'fit-content'
    },
    comandaPaymentValue: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        height: 40,
        padding: 10
    },
    comandaTitle: {
        marginBottom: 5,
        marginTop: 10,
    },
    
    locTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    map: {

        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden'
    },
    mapMap: {
        overflow: 'hidden',
        height: 350,
        marginBottom: 15,
        borderRadius: 10,
    },
    expandedMap: {
        elevation: 10
    },
    customMarker: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    }
})