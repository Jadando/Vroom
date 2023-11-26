import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Mapbox from '@rnmapbox/maps';
import * as Location from 'expo-location';
import { getFirestore, getDocs, query, where, updateDoc, collection } from "firebase/firestore";

Mapbox.setAccessToken('pk.eyJ1IjoiZGF0YWV4cGxvcmVycyIsImEiOiJjbG1qOWc5MzMwMWZuMnNyeDZwczdibTdmIn0.xyo6WcixY-D5MiT2SfZj5Q');

export default function FinalizarEntrega({ route }) {
    const navigation = useNavigation();
    const [IdentificadorEmpresa, setIdentificadorEmpresa] = useState(route.params?.IdentificadorEmpresa || '')
    const [nomeCliente, setNomeCliente] = useState(route.params?.nomeCliente)
    const [codPedido, setcodPedido] = useState(route.params?.codPedido || '')
    const [order, setOrder] = useState(route.params?.comanda || '');
    const [value, setValue] = useState(route.params?.valor || '');
    const [payment, setPayment] = useState(route.params?.tipoPagamento || '');
    const [endereco, setEndereco] = useState(route.params?.endereco || "Seu Endereço")
    const [iconRotation, setIconRotation] = useState(0);
    const [location, setLocation] = useState(null);
    const [isMapExpanded, setIsMapExpanded] = useState(false);

    const db = getFirestore();
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }
            //console.log("estive aqui")
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

                    //console.log('entrou')
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
        const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${location.coords.longitude},${location.coords.latitude}-46.687841%2C-24.123289?alternatives=true&annotations=duration%2Cdistance&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoiZGF0YWV4cGxvcmVycyIsImEiOiJjbG1qOWc5MzMwMWZuMnNyeDZwczdibTdmIn0.xyo6WcixY-D5MiT2SfZj5Q`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            //console.log(data)

            if (data.code === 'Ok' && data.routes.length > 0) {
                const route = data.routes[0].geometry.coordinates;
                //console.log(route)
                setRouteCoordinates(route);
            }
        } catch (error) {
            console.error('Erro ao obter direções:', error);
        }
    }

    const handleMapPress = () => {
        setIsMapExpanded(!isMapExpanded);
    };

    const FinalizarPedido = async () => {
        //console.log("estive aqui")
        const collectionRef = collection(db, "users", IdentificadorEmpresa, "Pedidos");
        const q = query(collectionRef, where('codPedido', '==', codPedido));
        try {
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(async (doc) => {
                // Para cada documento que corresponde à condição where
                await updateDoc(doc.ref, {
                    status: "concluido",
                });
                console.log(`Documento atualizado com sucesso: ${doc.id}`);
            });
            navigation.navigate('Pendentes')
        } catch (error) {
            console.error('Erro ao atualizar documentos:', error);
        }
    }
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
                        <Text>
                            Nome do cliente {'\n'}
                            {nomeCliente}
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
                                //console.log(routeCoordinates),
                                <Mapbox.ShapeSource id="routeSource" shape={{ type: 'LineString', coordinates: routeCoordinates }}>
                                    <Mapbox.LineLayer id="routeFill" style={{ lineColor: 'yellow', lineWidth: 3 }} />
                                </Mapbox.ShapeSource>
                            )}

                        </Mapbox.MapView>
                    </View>
                    <View style={styles.recentsContent}>
                        <Text>
                            Endereço {'\n'}
                            {endereco}
                        </Text>
                    </View>
                    <View style={styles.comanda}>
                        <Text style={styles.comandaTitle}>Comanda do pedido:</Text>
                        <View style={styles.comandaDescription}>
                            <Text style={styles.comandaDescription}>
                                {order}
                            </Text>
                        </View>
                        <Text style={styles.comandaTitle}>Forma de pagamento:</Text>
                        <View style={styles.comandaPaymentValue}>
                            <Text>
                                {payment}
                            </Text>
                        </View>
                        <Text style={styles.comandaTitle}>Valor do pedido:</Text>
                        <View style={styles.comandaPaymentValue}>
                            <Text>{value}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => FinalizarPedido()}
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
