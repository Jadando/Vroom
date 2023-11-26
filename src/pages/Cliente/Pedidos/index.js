import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Mapbox from '@rnmapbox/maps';
import * as Location from 'expo-location';
import { onSnapshot, collection, query, where, getFirestore } from 'firebase/firestore';
Mapbox.setAccessToken('pk.eyJ1IjoiZGF0YWV4cGxvcmVycyIsImEiOiJjbG1qOWc5MzMwMWZuMnNyeDZwczdibTdmIn0.xyo6WcixY-D5MiT2SfZj5Q');

export default function LocalCliente({ route }) {
    const [mostrarResultados, setMostrarResultados] = useState(false);
    const [resultados, setResultados] = useState([]);
    const navigation = useNavigation();
    const [iconRotation, setIconRotation] = useState(0);
    //const [nomeEmpresa, setNomeEmpresa] = useState()
    const [IdentificadorCliente, setIdentificador] = useState(route.params?.IdentificadorCliente || '');
    const db = getFirestore();
    useEffect(() => {
        (async () => {
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
    const [modalVisible, setModalVisible] = useState(false);
    const closeModal = () => {
        setModalVisible(false);
    }
    const [isExpanded, setIsExpanded] = useState(false);
    const url = 'https://figma.com/file/c97hMDfgLoFFWEAcetzH9C/TCC?type=design&node-id=0-1&mode=design&t=nfWUP24yYaj2kbHm-0';
    const displayUrl = isExpanded ? url : url.substring(0, 35) + '...';
    const [isMapExpanded, setIsMapExpanded] = useState(false);
    const handleMapPress = () => {
        setIsMapExpanded(!isMapExpanded);
    };

    const [seconds, setSeconds] = useState(300);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
        const remainingSeconds = totalSeconds % 60;

        if (hours > 0) {
            return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        } else {
            return `${remainingMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
    };



    useEffect(() => {
        const HistoricoRef = collection(db, 'users', IdentificadorCliente, 'Pedidos');

        // Adicione seu filtro usando 'where'
        const q = query(HistoricoRef, where('status', '==', 'pendente')); // Substitua 'campo' e 'valor' pelos seus critérios de filtro

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const documentosEncontrados = [];

            querySnapshot.forEach((doc) => {
                const documentoComID = { id: doc.id, data: doc.data() };
                documentosEncontrados.push(documentoComID);
            });

            setResultados(documentosEncontrados);
            // setIsLoading(false);
            setMostrarResultados(true);
        });

        // Limpe a assinatura quando o componente for desmontado ou quando necessário
        return () => unsubscribe();
    }, []);
    const renderizarResultados = () => {
        if (mostrarResultados) {
            return (
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    overScrollMode='never'
                    scrollEnabled={!isMapExpanded}
                >
                    <View style={styles.wrapper}>

                        {resultados.map((documento, index) => {
                            if (documento.data.status === "pendente") {
                                return (
                                    <>
                                        <View style={styles.container}>
                                            <View style={styles.header}>
                                                <TouchableOpacity
                                                    onPress={() => setModalVisible(!modalVisible)}
                                                    style={styles.headerBell}>
                                                    <Icon name='notifications' size={30} color='#ffc000' />
                                                    <Icon name='alert-circle' size={20} color='#cf2e2e' style={styles.alertIcon} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.pedidos} key={index}>
                                                <Text style={styles.pedidosText}>Entregas a caminho</Text>
                                                <View style={styles.pedidosClock}>
                                                    <Icon name='bicycle' size={30} color='#000' />
                                                </View>
                                            </View>
                                            <View style={styles.card}>
                                                <View style={styles.recentsContent}>
                                                    {/* <View style={styles.recentsImages}>
                                                        <Image source={require('../../../img/logo_sf.jpeg')} style={styles.img} />
                                                    </View> */}
                                                    <Text>
                                                        Empresa:{'\n'}
                                                        {documento.data.nomeEmpresa}
                                                    </Text>
                                                </View>
                                                <View style={styles.locTitle}>
                                                    <Text style={{ fontSize: 18 }}>Ver localização do entregador</Text>
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
                                                <View style={styles.deliveryTime}>
                                                    <Text>
                                                        Iniciou a entrega à: {formatTime(seconds)}
                                                    </Text>
                                                </View>
                                                {/* <View style={styles.recentsContent}>
                                                    <View style={styles.recentsImages}>
                                                        <Image source={require('../../../img/entregador.jpg')} style={styles.img} />
                                                    </View>
                                                    <Text>
                                                        Nome do entregador {'\n'}
                                                        Daniel Oliveira da Silva
                                                    </Text>
                                                </View> */}
                                            </View>
                                        </View>
                                        <Modal
                                            visible={modalVisible}
                                            transparent={true}
                                            animationType='slide'
                                            onRequestClose={closeModal}
                                        >
                                            <View style={styles.modalContainer}>
                                                <View style={styles.modalHeader}>
                                                    <Text style={styles.modalHeaderTitle}>Aviso</Text>
                                                    <TouchableOpacity
                                                        style={styles.modalHeaderClose}
                                                        onPress={() => setModalVisible(!modalVisible)} >
                                                        <Image source={require('../../../img/close.png')} style={{ width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                </View>

                                                <View>
                                                    <Text style={styles.modalContentTitle}>
                                                        Você confirma que recebeu sua entrega?
                                                    </Text>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                        <TouchableOpacity
                                                            onPress={() => setModalVisible(!modalVisible)}
                                                            style={styles.modalBtn}>
                                                            <Text style={styles.modalContent}>
                                                                Não
                                                            </Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={() => navigation.navigate('Pedidos')}
                                                            style={styles.modalBtn}>
                                                            <Text style={styles.modalContent}>
                                                                Sim
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </Modal>
                                    </>
                                );
                            } else {
                                return (
                                    <View style={styles.container}>
                                        <View style={styles.header}>
                                            <TouchableOpacity
                                                onPress={() => setModalVisible(!modalVisible)}
                                                style={styles.headerBell}>
                                                <Icon name='notifications' size={30} color='#ffc000' />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.pedidos}>
                                            <Text style={styles.pedidosText}>Nenhum Pedido a Caminho</Text>
                                            <View style={styles.pedidosClock}>
                                            </View>
                                        </View>
                                    </View>
                                );
                            }
                        })}
                    </View>
                </ScrollView >
            );
        }
    };


    return (
        renderizarResultados()
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexGrow: 1,
    },
    alertIcon: {
        position: 'absolute',
        top: -3,
        left: 13,
    },
    container: {
        flex: 1,
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
        position: 'relative',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: '90%',
        borderRadius: 8,
        padding: 10,
        height: 'fit-content'
    },
    recents: {
        alignSelf: 'center',
        marginBottom: 30
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
        padding: 10,
        backgroundColor: '#fff',
        width: 70,
        height: 70,
        marginRight: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 70,
        height: 70
    },
    deliveryTime: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 10,
        height: 40,
        padding: 10,
        marginBottom: 15,
        alignSelf: 'center'
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
    modalContainer: {
        alignSelf: 'center',
        marginTop: '50%',
        width: 300,
        backgroundColor: '#f2f2f2',
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 50
    },
    modalHeader: {
        backgroundColor: '#ffc000',
        width: '100%',
        height: 40,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    modalHeaderTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#121212',
        textAlign: 'center',
    },
    modalHeaderClose: {
        justifyContent: 'flex-end',
    },
    modalContentTitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
    },
    modalContent: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#121212'
    },
    modalBtn: {
        width: '45%',
        height: 40,
        borderRadius: 10,
        backgroundColor: '#ffc000',
        padding: 5,
        marginBottom: 20,
        alignSelf: 'center'
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
})
