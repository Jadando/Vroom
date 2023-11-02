import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { useTheme } from 'styled-components';
import DropDownPicker from 'react-native-dropdown-picker';
import { validarCNPJ } from '../../../../components/Validar/ValidarCnpj'

export default function CadastroEmpresa({ route }) {
  const navigation = useNavigation();
  const tema = useTheme();
  const [open, setOpen] = useState(false);
  const styles = getstyles(tema);
  const [Identificador, setIdentificador] = useState(route.params?.Identificador || '');
  const [cnpj, setCnpj] = useState('95.250.873/0001-69');
  const [cnpjValido, setCnpjValido] = useState(true);
  const [nomeEmpresa, setNomeEmpresa] = useState('a');
  const [categoria, setCategoria] = useState('a');
  const [items, setItems] = useState([
    { label: 'Restaurante', value: 'restaurante' },
    { label: 'Fármacia', value: 'farmacia' },
    { label: 'Bebidas', value: 'bebidas' },
    { label: 'Mercado', value: 'mercado' },
    { label: 'Jardinagem', value: 'jardinagem' },
    { label: 'Outros', value: 'outros' }
  ]);
  const [celular, setCelular] = useState('12345522222');
  const [telefone, setTelefone] = useState('1212121212');
  const [cep, setCep] = useState('11730000');
  const [estado, setEstado] = useState('sp');
  const [cidade, setCidade] = useState('ppp');
  const [bairro, setBairro] = useState('ppp');
  const [endereco, setEndereco] = useState('ppp');
  const [numero, setNumero] = useState('pppp');

  const handleChangeCNPJ = (text) => {
    if (text.length === 18) {
      setCnpj(text);
      const isValid = validarCNPJ(text);
      setCnpjValido(isValid);
    }
    else{
      setCnpjValido(true);
    }
  };


  function verificaInput() {
    if (
      cnpj !== '' &&
      nomeEmpresa !== '' &&
      categoria !== '' &&
      telefone !== '' &&
      cep !== '' &&
      estado !== '' &&
      cidade !== '' &&
      bairro !== '' &&
      endereco !== '' &&
      numero !== ''
    ) {

      navigation.navigate('Afiliado', {
        Identificador,
        cnpj,
        nomeEmpresa,
        categoria,
        telefone,
        cep,
        estado,
        cidade,
        bairro,
        endereco,
        numero,
        celular
      });
    } else {
      alert('Campos obrigatórios não preenchidos');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerContentCircle}>
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
          <View style={styles.headerContentCircleInative}>
            <Text style={styles.headerCircleNumber}>
              {' '}
              3 {' '}
            </Text>
          </View>
          <Text style={styles.headerText}>Revisão</Text>
        </View>
      </View>

      <ScrollView
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Informações da empresa</Text>
        <View style={styles.main}>
          <TextInputMask
            style={styles.input}
            type={'cnpj'}
            value={cnpj}
            onChangeText={handleChangeCNPJ}
            placeholder='CNPJ'
          />
          {cnpj && !cnpjValido && <Text style={{ color: 'red' }}>CNPJ inválido</Text>}
          <TextInput
            style={styles.input}
            value={nomeEmpresa}
            onChangeText={setNomeEmpresa}
            placeholder="Nome da empresa"
          />
          <TextInputMask
            style={styles.input}
            type={'cel-phone'}
            value={telefone}
            onChangeText={setTelefone}
            placeholder="Telefone Fixo"
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99)',
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
          <DropDownPicker
            open={open}
            value={categoria}
            items={items}
            setOpen={setOpen}
            setValue={setCategoria}
            setItems={setItems}
            placeholder='Selecione uma categoria'
            style={[
              styles.input,
              {
                borderColor: 'transparent',
                fontSize: 20,
                borderBottomWidth: 1,
              }
            ]}
            dropDownContainerStyle={[
              styles.input,
              {
                borderColor: 'transparent',
              }
            ]}
            textStyle={{
              fontSize: 18,
              opacity: 0.8,
              //   borderBottomWidth: 1,
              //  borderBottomColor: '#000'
            }}
            scrollViewProps={{
              onTouchStart: () => {
                console.log("onTouchStart");
                this.scroll.setNativeProps({ scrollEnabled: false });
              },
              onTouchEnd: () => {
                console.log("onTouchEnd");
                this.scroll.setNativeProps({ scrollEnabled: true });
              },
            }}
          />

          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => navigation.pop(1)}
              style={styles.cadastrar}
            >
              <Text style={styles.cadastrarText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={verificaInput}
              style={styles.cadastrar}
            >
              <Text style={styles.cadastrarText}>Próxima etapa</Text>
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
    marginLeft: -28,
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
    fontSize: 25,
    marginTop: 20,
    alignSelf: 'center',
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
