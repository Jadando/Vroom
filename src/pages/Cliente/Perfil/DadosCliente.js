import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';

export default function DadosCliente() {
  const navigation = useNavigation();
  const tema = useTheme();
  const styles = getstyles(tema);
  const [nome, setNome] = useState('João Adriano');
  const [telefone, setTelefone] = useState('1898180400');
  const [cep, setCep] = useState('11730000');
  const [estado, setEstado] = useState('sp');
  const [cidade, setCidade] = useState('sao paulo');
  const [bairro, setBairro] = useState('Agenor de Campos');
  const [endereco, setEndereco] = useState('Av. Monteiro Lobato');
  const [numero, setNumero] = useState('779');




  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.title}>
            Meus Dados
          </Text>
      </View>

      <ScrollView
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        overScrollMode='never'
      >
        <View style={styles.main}>
          <TextInput
            style={styles.input}
            value={nome}
            editable={false}
            placeholder="Nome completo"
          />
          <TextInputMask
            style={styles.input}
            type={'cel-phone'}
            value={telefone}
            editable={false}
            placeholder="Telefone"
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }}
          />
          <TextInputMask
            style={styles.input}
            type={'zip-code'}
            value={cep}
            editable={false}
            placeholder="CEP"
          />
          <TextInput
            style={styles.input}
            value={estado}
            editable={false}
            placeholder="Estado"
          />
          <TextInput
            style={styles.input}
            value={cidade}
            editable={false}
            placeholder="Cidade"
          />
          <TextInput
            style={styles.input}
            value={bairro}
            editable={false}
            placeholder="Bairro"
          />
          <TextInput
            style={styles.input}
            value={endereco}
            editable={false}
            placeholder="Endereço"
          />
          <TextInput
            style={styles.input}
            value={numero}
            onChangeText={setNumero}
            placeholder="Número"
          />

          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={()=>navigation.navigate('PerfilCliente')}
              style={styles.cadastrar}
            >
              <Text style={styles.cadastrarText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>navigation.navigate('AlterarCliente')}
              style={styles.cadastrar}
            >
              <Text style={styles.cadastrarText}>Alterar Dados</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const getstyles = (tema) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    width: '100%',
    height: 150,
    padding: 20,
    marginTop: '10%',
    paddingTop: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flexDirection: 'column',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  headerContentCircle: {
    borderRadius: 50,
    borderWidth: 3,
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  headerContentCircleInative: {
    borderRadius: 50,
    borderWidth: 3,
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#e6e4df',
  },
  headerCircleNumber: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  separador: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '60%',
    marginLeft: -41,
    marginRight: -3,
    marginBottom: 20,
  },
  separadorLinha: {
    flex: 1,
    borderBottomWidth: 3,
    alignSelf: 'center',
    elevation: 1,
  },
  headerText: {
    fontSize: 15,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  main: {
    alignSelf: 'center',
  },
  input: {
    fontSize: 18,
    padding: 5,
    paddingLeft: 15,
    margin: 5,
    marginLeft: 15,
    width: 300,
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  cadastrar: {
    height: 60,
    width: '40%',
    alignSelf: 'center',
    backgroundColor: '#ffc000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 30,
    padding: 5,
  },
  cadastrarText: {
    fontSize: 17,
    color: '#121212',
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
