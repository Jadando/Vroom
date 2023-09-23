import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Drop = () => {
  const [inputText, setInputText] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [valorPedido, setValorPedido] = useState('');

  const handleValorPedidoChange = (text) => {
    const formattedValue = text.replace(/\D/g, '');
    const currencyValue = (formattedValue / 100).toFixed(2);

    setValorPedido(currencyValue);
  };

  const handleConfirmarPedido = () => {
    
    console.log('Pedido Confirmado:');
    console.log('Pedido:', inputText);
    console.log('Forma de Pagamento:', formaPagamento);
    console.log('Valor do Pedido:', valorPedido);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <View style={styles.square}>
          <Text style={styles.text}>Comanda dos Pedidos</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setInputText(text)}
            value={inputText}
            placeholder="Escreva o pedido aqui:"
          />
          <Text style={styles.label}>Forma de pagamento:</Text>
          <Picker
            style={styles.picker}
            selectedValue={formaPagamento}
            onValueChange={(itemValue) => setFormaPagamento(itemValue)}
          >
            <Picker.Item label="Dinheiro" value="dinheiro" />
            <Picker.Item label="CartÃ£o" value="cartao" />
            <Picker.Item label="Pix" value="pix" />
          </Picker>
          <Text style={styles.label}>Valor do pedido:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleValorPedidoChange(text)}
            value={valorPedido}
            placeholder="R$ 0,00"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={[styles.confirmButton, { marginTop: 40 }]}
            onPress={handleConfirmarPedido}
          >
            <Text style={styles.confirmButtonText}>Confirmar Pedido</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    width: 300,
    height: 600,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 300,
    height: 500,
    backgroundColor: '#FFC000',
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 20,
    paddingLeft: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    color: 'black',
    textAlign: 'left',
  },
  picker: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Drop;

  