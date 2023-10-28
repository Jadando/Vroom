import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';


export default function Home({ route }) {
  const [IdentificadorCliente, setIdentificador] = useState(route.params?.IdentificadorCliente || '');
  const [endereco, setEndereco] = useState("Seu Endereço")
  console.log(IdentificadorCliente)

  const tema = useTheme();
  const styles = getstyles(tema);
  const navigation = useNavigation();
  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerContent}>
          <Text style={styles.title}>
            {endereco}
          </Text>
          <Icon name='chevron-down' size={30} color={tema.Tema.color} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBell}><Icon name='notifications' size={30} color='#ffc000' /></TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode='never'
      >
        <View style={styles.categorias}>
          <View style={styles.categoriasContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Restaurante')}>
              <View style={styles.categoriasContent}>
                <Text style={{ ...styles.categoriaText, marginBottom: -15 }}>
                  Restaurantes
                </Text>
                <Image source={require('../../../img/restaurante.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.categoriasContent}>
                <Text style={styles.categoriaText}>Fármacias</Text>
                <Image source={require('../../../img/farm.png')} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriasContainer}>
            <TouchableOpacity>
              <View style={styles.categoriasContent}>
                <Text style={styles.categoriaText}>Bebidas</Text>
                <Image source={require('../../../img/bebida.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.categoriasContent}>
                <Text style={{ ...styles.categoriaText, marginBottom: -5 }}>Mercados</Text>
                <Image source={require('../../../img/merc.png')} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriasContainer}>
            <TouchableOpacity>
              <View style={styles.categoriasContent}>
                <Text style={styles.categoriaText}>Jardinagem</Text>
                <Image source={require('../../../img/jard.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.categoriasContent}>
                <Text style={styles.categoriaText}>Outros</Text>
                <Image source={require('../../../img/outro.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.recents}>
          <Text style={styles.recentsTitle}>
            Pedido Recentemente
          </Text>
          <View style={styles.recentsContainer}>
            <View style={styles.recentsContent}>
              <View style={styles.recentsImages}>
              </View>
              <Text style={styles.categoriaText}>
                Luzia Hamburgers {'\n'}
                Ultimo pedido dia: 11/04/2023
              </Text>
            </View>
            <View style={styles.recentsContent}>
              <View style={styles.recentsImages}>
              </View>
              <Text style={styles.categoriaText}>
                Mix Shakes {'\n'}
                Ultimo pedido dia: 09/04/2023
              </Text>
            </View>
            <View style={styles.recentsContent}>
              <View style={styles.recentsImages}>
              </View>
              <Text style={styles.categoriaText}>
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
  header: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 70,
  },
  headerBell: {
    alignSelf: 'flex-end'
  },
  title: {
    fontSize: 20,
    color: tema.Tema.color,
  },
  categorias: {
    backgroundColor: tema.Tema.background,
    margin: 15,
    padding: 15,
  },
  categoriasContainer: {
    flexDirection: 'row',
    padding: 15,
    margin: '-5%'
  },
  categoriasContent: {
    backgroundColor: tema.Tema.content,
    borderRadius: 10,
    padding: 10,
    margin: 15,
    width: 150,
    height: 80,
    alignItems: 'center',
  },
  categoriaText: {
    color: tema.Tema.color,
  },
  recents: {
    alignSelf: 'flex-start',
    margin: 20,
  },
  recentsTitle: {
    fontSize: 20,
    alignSelf: 'flex-start',
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