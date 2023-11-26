import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Modal, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Mapbox from '@rnmapbox/maps';
import * as Location from 'expo-location';

Mapbox.setAccessToken('pk.eyJ1IjoiZGF0YWV4cGxvcmVycyIsImEiOiJjbG1qOWc5MzMwMWZuMnNyeDZwczdibTdmIn0.xyo6WcixY-D5MiT2SfZj5Q');

export default function FinalizarEntrega() {
    const navigation = useNavigation();
    const [iconRotation, setIconRotation] = useState(0);
    const [location, setLocation] = useState(null);
    const [isMapExpanded, setIsMapExpanded] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            const subscription = Location.watchPositionAsync({
                accuracy: Location.Accuracy.High,
                timeInterval: 1000,
                distanceInterval: 1,
            },
                (newLocation) => {
                    if (location) {
                        const angle = calculateAngle(location.coords, newLocation.coords);
                        setIconRotation(angle);
                    }
                    setLocation(newLocation);

                    console.log('entrou')
                    updateRouteCoordinates();
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

    const [routeCoordinates, setRouteCoordinates] = useState([]);
    async function updateRouteCoordinates() {
        const apiKey = 'pk.eyJ1IjoiZGF0YWV4cGxvcmVycyIsImEiOiJjbG1qOWc5MzMwMWZuMnNyeDZwczdibTdmIn0.xyo6WcixY-D5MiT2SfZj5Q';
        const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/-46.687909%2C-24.123248%3B-46.678451%2C-24.12218?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data)

            if (data.code === 'Ok' && data.routes.length > 0) {
                const route = data.routes[0].geometry.coordinates;
                console.log(route)
                setRouteCoordinates(route);
            }
        } catch (error) {
            console.error('Erro ao obter direções:', error);
        }
    }

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
                    <TouchableOpacity
                        onPress={() => navigation.pop(2)}>
                        <Icon name='chevron-back' size={30} color='#000' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name='notifications' size={30} color='#ffc000' />
                    </TouchableOpacity>
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
                            <Image source={require('../../../../img/logo_sf.jpeg')} style={styles.img} />
                        </View>
                        <Text>
                            SF Refrigeração {'\n'}
                            Cd pedido: 04
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

                            {routeCoordinates.length > 0 && (
                                console.log(routeCoordinates),
                                <Mapbox.ShapeSource id="routeSource" shape={{ type: 'LineString', coordinates: routeCoordinates }}>
                                    <Mapbox.LineLayer id="routeFill" style={{ lineColor: 'yellow', lineWidth: 3 }} />
                                </Mapbox.ShapeSource>
                            )}

                        </Mapbox.MapView>
                    </View>
                    <View style={styles.recentsContent}>
                        <View style={styles.recentsImages}>
                            <Image source={require('../../../../img/logo_luisa.jpg')} style={styles.img} />
                        </View>
                        <Text>
                            Nome do cliente {'\n'}
                            Luísa Oliveira
                        </Text>
                    </View>
                    <View style={styles.comanda}>
                        <Text style={styles.comandaTitle}>Comanda do pedido:</Text>
                        <View style={styles.comandaDescription}>
                            <Text style={styles.comandaDescription}>
                                1kg Gelo
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
                            <Text>R$ 19,99</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Pendentes')}
                    style={styles.button}>
                    <Text>Finalizar Entrega</Text>
                </TouchableOpacity>
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
        overflow: 'hidden'
    },
    img: {
        width: 70,
        height: 70
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
    },
    button: {
        height: 50,
        width: 250,
        backgroundColor: '#ffc000',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 10,
        elevation: 2,
        marginBottom: 15
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '600',
    },
})
