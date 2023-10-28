import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { useTheme } from 'styled-components';
import { getFirestore, onSnapshot, doc } from "firebase/firestore";



export default function DadosCliente({route}) {
  const navigation = useNavigation();
  const tema = useTheme();
  const [IdentificadorCliente, setIdentificador] = useState(route.params?.IdentificadorCliente || '');
  const styles = getstyles(tema);
  const [nome, setNome] = useState();
  const [telefone, setTelefone] = useState();
  const [cep, setCep] = useState();
  const [estado, setEstado] = useState();
  const [cidade, setCidade] = useState();
  const [bairro, setBairro] = useState();
  const [endereco, setEndereco] = useState();
  const [numero, setNumero] = useState();


  useEffect(() => {
    const db = getFirestore();
    const docRef = doc(db, "usuario", "tabela", "cliente", IdentificadorCliente);
  
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setNome(userData.nome);
        setTelefone(userData.telefone);
        setCep(userData.cep);
        setEstado(userData.estado);
        setCidade(userData.cidade);
        setBairro(userData.bairro);
        setEndereco(userData.endereco);
        setNumero(userData.numero);
      } else {
        console.log("O documento não existe.");
      }
    });
  
    return () => {
      // Ao desmontar o componente, pare de ouvir as atualizações
      unsubscribe();
    };
  }, [IdentificadorCliente]);


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
            editable={false}
            placeholder="Número"
          />

          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => navigation.pop(1)}
              style={styles.cadastrar}
            >
              <Text style={styles.cadastrarText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AlterarCliente', {
                  IdentificadorCliente,
                  nome,
                  telefone,
                  cep,
                  estado,
                  cidade,
                  bairro,
                  endereco,
                  numero
                });
              }}
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
