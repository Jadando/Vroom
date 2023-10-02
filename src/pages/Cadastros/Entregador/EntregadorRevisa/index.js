import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { useTheme } from 'styled-components';

export default function EntregadorRevisa({ route }) {
  const navigation = useNavigation();
  const tema = useTheme();
  const styles = getstyles(tema);
  const [cnpj, setCnpj] = useState(route.params?.cnpj || '');
  const [nomeEmpresa, setNomeEmpresa] = useState(route.params?.nomeEmpresa || '');
  const [cpf, setCpf] = useState(route.params?.cpf || '');
  const [nome, setNome] = useState(route.params?.nome || '');
  const [dtNasc, setDtNasc] = useState(route.params?.dtNasc || '');
  const [telefone, setTelefone] = useState(route.params?.telefone || '');
  const [cep, setCep] = useState(route.params?.cep || '');
  const [estado, setEstado] = useState(route.params?.estado || '');
  const [cidade, setCidade] = useState(route.params?.cidade || '');
  const [bairro, setBairro] = useState(route.params?.bairro || '');
  const [endereco, setEndereco] = useState(route.params?.endereco || '');
  const [numero, setNumero] = useState(route.params?.numero || '');

  async function verificaInput() {
    if (
      cpf !== '' &&
      nome !== '' &&
      telefone !== '' &&
      cep !== '' &&
      estado !== '' &&
      cidade !== '' &&
      bairro !== '' &&
      endereco !== '' &&
      numero !== ''
    ) {
      // const db = getFirestore()
      // try {
      //   await addDoc(collection(db, "users"), {
      //     nome: nome,
      //     telefone: telefone,
      //     cep: cep,
      //     cpf: cpf,
      //     estado: estado,
      //     cidade: cidade,
      //     bairro: bairro,
      //     endereco: endereco,
      //     numero: numero,
      //     dtNasc: dtNasc,
      //     nomeEmpresa: nomeEmpresa,
      //   });
      // } catch (e) {
      //   console.error("Error adding document: ", e);
      // }
     // navigation.dispatch(StackActions.popToTop())
     navigation.navigate('Pendentes')
    } else {
      alert('Campos obrigatórios não preenchidos');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerContentCircleInative}>
            <Text style={styles.headerCircleNumber}>
              {' '}
              1 {' '}
            </Text>
          </View>
          <Text style={styles.headerText}>Informações</Text>
        </View>
        <View style={styles.separador}>
          <View style={styles.separadorLinha}></View>
        </View>
        <View style={styles.separador2}>
          <View style={styles.separadorLinha}></View>
        </View>
        <View style={styles.headerContent}>
          <View style={styles.headerContentCircle}>
            <Text style={styles.headerCircleNumber}>
              {' '}
              2 {' '}
            </Text>
          </View>
          <Text style={styles.headerText}>Revisão</Text>
        </View>
      </View>

      <ScrollView
        style={{ width: '100%' }}
        overScrollMode='never'
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Por favor revise suas Informações antes de concluir o cadastro</Text>
        <View style={styles.main}>
          <TextInputMask
            style={styles.input}
            type={'cpf'}
            value={cpf}
            onChangeText={setCpf}
            maxLength={14}
            placeholder='CPF'
          />
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Nome completo"
          />
          <TextInput
            style={styles.input}
            value={dtNasc}
            placeholder='Data de nascimento'
            keyboardType='numeric'
            maxLength={10}
            onBlur={() => {
              if (dtNasc.length !== 10) {
              }
            }}
            onChangeText={(text) => {
              if (/^\d{2}$/.test(text)) {
                setDtNasc(text + '/');
              } else if (/^\d{2}\/\d{2}$/.test(text)) {
                setDtNasc(text + '/');
              } else {
                setDtNasc(text);
              }
            }}
          />
          <TextInputMask
            style={styles.input}
            type={'cel-phone'}
            value={telefone}
            onChangeText={setTelefone}
            maxLength={15}
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
            onChangeText={setCep}
            maxLength={9}
            placeholder="CEP"
          />
          <TextInput
            style={styles.input}
            value={estado}
            onChangeText={setEstado}
            placeholder="Estado"
          />
          <TextInput
            style={styles.input}
            value={cidade}
            onChangeText={setCidade}
            placeholder="Cidade"
          />
          <TextInput
            style={styles.input}
            value={bairro}
            onChangeText={setBairro}
            placeholder="Bairro"
          />
          <TextInput
            style={styles.input}
            value={endereco}
            onChangeText={setEndereco}
            placeholder="Endereço"
          />
          <TextInput
            style={styles.input}
            value={numero}
            onChangeText={setNumero}
            placeholder="Número"
          />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CadastroEntregador')}
            style={styles.cadastrar}
          >
            <Text style={styles.cadastrarText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={verificaInput}
            style={styles.cadastrar}
          >
            <Text style={styles.cadastrarText}>Concluir cadastro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const getstyles = (tema) => StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#ffc000',
    width: '100%',
    height: 120,
    padding: 20,
    paddingLeft: 25,
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
    width: '30%',
    marginLeft: -41,
    marginRight: -6,
    marginBottom: 20,
  },
  separador2: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '30%',
    marginLeft: -30,
    marginRight: -5,
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
    fontSize: 20,
    marginTop: 30,
    alignSelf: 'center',
    textAlign: 'center',
    margin: 15,
  },
  main: {
    marginTop: 50,
    alignSelf: 'center',
    alignItems: 'center'
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
    height: 50,
    width: '40%',
    alignSelf: 'center',
    backgroundColor: '#ffc000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 30,
    padding: 5,
  },
  cadastrarText: {
    fontSize: 18,
    color: '#121212',
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  mainEmpresa: {
    padding: 30,
    marginTop: 30,
    paddingTop: 10,
    borderWidth: 1.5,
    borderRadius: 15,
    marginBottom: 30
  },
});
