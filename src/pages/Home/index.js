import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


export default function Home() {
  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.header}>
          <Text style={styles.title}>
            Seu endereço
          </Text>
          <Icon name='chevron-down' size={30} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        overScrollMode='never'
        style={{ width: '100%' }}
      >
        <View style={styles.nav}>
          <View style={styles.navItemContainer}>
            <Text style={styles.navItems}>Restaurantes</Text>
          </View>
          <View style={styles.navItemContainer}>
            <Text style={styles.navItems}>Farmacias</Text>
          </View>
          <View style={styles.navItemContainer}>
            <Text style={styles.navItems}>Mercado</Text>
          </View>
          <View style={styles.navItemContainer}>
            <Text style={styles.navItems}>Jardinagem</Text>
          </View>
          <View style={styles.navItemContainer}>
            <Text style={styles.navItems}>Outros</Text>
          </View>
        </View>
      </ScrollView>


      <View style={styles.main}>
      <Text>Hello worlde
        
      </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 15
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '5%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginRight: 5
  },
  nav: {
    width: '100%',
    marginTop: 10,
    height: 60,
    borderWidth: 1.5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  navItems: {
    fontSize: 20,
  },
  navItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})