import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';

export default function LogoutModal({ modalVisible, setModalVisible }) {
    const navigation = useNavigation();
    const closeModal = () => {
    setModalVisible(false);
  }

  return(
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
              <Image source={require('./../../img/close.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.modalContentTitle}>
              Tem certeza que deseja sair da sua conta
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.modalBtn}>
              <Text style={styles.modalContent}>
                Não
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.dispatch(StackActions.popToTop())}
              style={styles.modalBtn}>
              <Text style={styles.modalContent}>
                Sim
              </Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
        alignSelf: 'center',
        marginTop: '50%',
        width: 300,
        backgroundColor: '#f2f2f2',
        margin: 20,
        borderRadius: 10,
        height: 'fit-content',
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
})