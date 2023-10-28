import React from 'react';
import { View, ActivityIndicator, Modal, StyleSheet } from 'react-native';

const LoadingModal = ({ visible }) => (
  <Modal
    transparent={true}
    animationType="none"
    visible={visible}
    onRequestClose={() => {}}
  >
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default LoadingModal;