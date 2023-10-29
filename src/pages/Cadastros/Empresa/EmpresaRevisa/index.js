import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useTheme } from 'styled-components';
import LoadingModal from '../../../../components/loadingModal';

export default function EmpresaRevisa({ route }) {
  const navigation = useNavigation();
  const tema = useTheme();
  const styles = getstyles(tema);
  const [isLoading, setIsLoading] = useState(false);

  const [Identificador, setIdentificador] = useState(route.params?.Identificador || '');
  const [cnpj, setCnpj] = useState(route.params?.cnpj || '');
  const [nomeEmpresa, setNomeEmpresa] = useState(route.params?.nomeEmpresa || '');
  const [categoria, setCategoria] = useState(route.params?.categoria || '');
  const [telefone, setTelefone] = useState(route.params?.telefone || '');
  const [cep, setCep] = useState(route.params?.cep || '');
  const [estado, setEstado] = useState(route.params?.estado || '');
  const [cidade, setCidade] = useState(route.params?.cidade || '');
  const [bairro, setBairro] = useState(route.params?.bairro || '');
  const [endereco, setEndereco] = useState(route.params?.endereco || '');
  const [numero, setNumero] = useState(route.params?.numero || '');
  async function verificaInput() {
    if (
      cnpj !== '' &&
      nomeEmpresa !== '' &&
      telefone !== '' &&
      cep !== '' &&
      estado !== '' &&
      cidade !== '' &&
      bairro !== '' &&
      endereco !== '' &&
      numero !== ''
    ) {
      try {
        setIsLoading(true);
        console.log(isLoading)
        // Substitua com o UID desejado
        const db = getFirestore();

        const docRef = doc(db, "usuario/tabela/empresa", Identificador); // Crie uma referência ao documento com o UID específico

        const dados = {
          cnpj: cnpj,
          nome: nomeEmpresa,
          telefone: telefone,
          cep: cep,
          estado: estado,
          cidade: cidade,
          bairro: bairro,
          endereco: endereco,
          numero: numero,
          categoria: categoria
        };

        await setDoc(docRef, dados); // Use setDoc para criar o documento com os dados
        navigation.navigate('IniciarEntrega',{
          IdentificadorEmpresa:Identificador
        })
        setIsLoading(false);
        console.log('Documento criado com sucesso');
        setIsLoading(false);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
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
        <View style={styles.headerContent}>
          <View style={styles.headerContentCircleInative}>
            <Text style={styles.headerCircleNumber}>
              {' '}
              2 {' '}
            </Text>
          </View>
          <Text style={styles.headerText}>Vincular</Text>
        </View>
        <View style={styles.separador2}>
          <View style={styles.separadorLinha}></View>
        </View>
        <View style={styles.headerContent}>
          <View style={styles.headerContentCircle}>
            <Text style={styles.headerCircleNumber}>
              {' '}
              3 {' '}
            </Text>
          </View>
          <Text style={styles.headerText}>Revisão</Text>
        </View>
      </View>

      <ScrollView
        overScrollMode='never'
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Informações da empresa</Text>
        <View style={styles.main}>
          <TextInputMask
            style={styles.input}
            type={'cnpj'}
            value={cnpj}
            onChangeText={setCnpj}
            placeholder='CNPJ'
          />
          <TextInput
            style={styles.input}
            value={nomeEmpresa}
            onChangeText={setNomeEmpresa}
            placeholder="Nome da empresa"
          />
          <TextInput
            style={styles.input}
            value={categoria}
            onChangeText={setCategoria}
            placeholder='Categoria'
          />
          <TextInputMask
            style={styles.input}
            type={'cel-phone'}
            value={telefone}
            onChangeText={setTelefone}
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

          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Afiliado')}
              style={styles.cadastrar}
            >
              <Text style={styles.cadastrarText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={verificaInput}
              style={styles.cadastrar}
            >
              <Text style={styles.cadastrarText}>Concluir</Text>
            </TouchableOpacity>
          </View>
        </View>
        <LoadingModal visible={isLoading} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flexDirection: 'column',
    marginTop: 10,
    alignContent: 'center',
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
    marginTop: 20,
    alignSelf: 'center',
    textAlign: 'center',
    margin: 15,
  },
  main: {
    marginTop: 50,
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
});
