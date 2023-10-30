import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import { getDocs, collection, query, where, getFirestore } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import LoadingModal from '../../../components/loadingModal'

export default function Search() {
    const tema = useTheme();
    const styles = getstyles(tema);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [pesquisa, setPesquisa] = useState(null);
    const [resultados, setResultados] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [mostrarResultados, setMostrarResultados] = useState(false);
    const db = getFirestore();

    const Consultar = async (pesquisa) => {
        const empresaRef = collection(db, 'usuario/tabela/empresa');

        const q = query(empresaRef, where('nome', '==', pesquisa));

        try {
            const querySnapshot = await getDocs(q);
            const documentosEncontrados = [];

            querySnapshot.forEach((doc) => {
                const documentoComID = { id: doc.id, data: doc.data() };
                documentosEncontrados.push(documentoComID);
            });

            return documentosEncontrados;
        } catch (error) {
            console.error('Erro ao consultar o Firestore:', error);
        }
    };

    async function DonwloadImg(documento) {
        try {
            const storage = getStorage();
            const imageRef = ref(storage, `usuario/imagem/empresa/${documento.id}/${documento.id}_company`);
            const url = await getDownloadURL(imageRef);
            const response = await fetch(url);
            const data = await response.text();
            const numericArray = data.split(",");
            const asciiString = numericArray.map((numericValue) => String.fromCharCode(parseInt(numericValue))).join("");
            const imageUrl = {
                id: documento.id,
                url: 'data:image/jpeg;base64,' + asciiString
            };

            setImageUrls((prevImageUrls) => [...prevImageUrls, imageUrl]);
        } catch (error) {
            console.error('Erro ao recuperar a URL da imagem:', error);
        }
    }

    const handlePesquisar = async () => {
        try {
            setIsLoading(true);
            const resultadoDaConsulta = await Consultar(pesquisa);
            setImageUrls([]);
            resultadoDaConsulta.forEach((documento) => {
                DonwloadImg(documento);
            });
            setResultados(resultadoDaConsulta);
            setMostrarResultados(true);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Erro ao consultar o Firestore:', error);
        }
    };

    const renderizarResultados = () => {
        if (mostrarResultados) {
            if (resultados.length > 0) {
                return (
                    <View style={styles.recents}>
                        <Text style={styles.recentsTitle}>Resultado da busca</Text>
                        <View style={styles.recentsContainer}>
                            {resultados.map((documento, index) => {
                                const imageUrl = imageUrls.find((img) => img.id === documento.id);
                                if (imageUrl && imageUrl.url) {
                                    return (
                                        <TouchableOpacity onPress={() => navigation.navigate('VisualizarEmpresa', { IdentificadorEmpresa: documento.id })} key={index}>
                                            <View style={styles.recentsContent}>
                                                <View style={styles.recentsImages}>
                                                    <Image source={{ uri: imageUrl.url }} key={documento.id} style={styles.image} />
                                                </View>
                                                <Text style={styles.Text}>
                                                    {documento.data.nome} {'\n'}
                                                    A 3.45km De você
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </View>
                    </View>
                );
            } else {
                return (
                    <View style={styles.container}>
                        <Text style={styles.Text}>Nenhum resultado encontrado</Text>
                    </View>
                );
            }
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerContent}>
                    <Text style={styles.title}>Seu endereço</Text>
                    <Icon name="chevron-down" size={30} color={tema.Tema.color} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerBell}>
                    <Icon name="notifications" size={30} color="#ffc000" />
                </TouchableOpacity>
            </View>

            <View style={styles.search}>
                <TouchableOpacity onPress={handlePesquisar}>
                    <View style={styles.searchLupe}>
                        <Icon name="search" size={25} color={tema.Tema.color} />
                    </View>
                </TouchableOpacity>
                <TextInput
                    placeholder="Buscar estabelecimentos"
                    style={{ fontSize: 18, color: tema.Tema.color }}
                    placeholderTextColor={tema.Tema.color}
                    onChangeText={setPesquisa}
                />
            </View>
            <LoadingModal visible={isLoading} />
            {renderizarResultados()}
        </View>
    );
}

const getstyles = (tema) => StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        backgroundColor: tema.Tema.background,
    },
    Text: {
        color: tema.Tema.color,
        fontSize: 18,
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        marginTop: '5%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 20,
        marginBottom: 30,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 70,
    },
    headerBell: {
        alignSelf: 'flex-end',
    },
    title: {
        fontSize: 20,
        color: tema.Tema.color,
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
        marginBottom: 100,
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
    recentsImages: {
        borderRadius: 50,
        padding: 10,
        backgroundColor: '#fff',
        width: 70,
        height: 70,
        marginRight: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#ffc000',
    },
    image: {
        borderRadius: 50,
        width: 95,
        height: 95,
    },
});
