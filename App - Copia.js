import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import './src/firebaseConnection';
import { getDatabase, ref, get, child, set, push, update, onValue } from "firebase/database";



const Stack = createStackNavigator();

const LoginScreen = () => {

  const [email, setEmail] = useState('joao@gmail.com');
  const [senha, setPassword] = useState('teste 12345');
  const [nome, setNome] = useState('');
  //const [teste, setTeste] = useState('Teste');

  const handleLogin = () => {
    const data = {
      nome: nome,
      email: email,
      senha: senha,
    };


    // UPDATA 
    function writeNewPost(email, senha, nome) {
      const db = getDatabase();
   
      // A post entry.
      const postData = {
         nome: nome,
         email: email,
         senha: senha,
      };
      // Get a key for a new Post.
      const IdUser=1;
      const newPostKey = (ref(db), 'usuarios/id/'+IdUser);
   
      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates[newPostKey] = postData;
      return update(ref(db), updates);
   }
   
   
   writeNewPost(data.email, data.senha, data.nome);

    //Escrita
    //  function writeUserData(email, senha,nome) {
    //     const db = getDatabase();
    //    set(ref(db, 'usuarios/id/1'), {
    //      nome:nome,
    //      email: email,
    //      senha: senha,

    //    });
    //  }

    //  writeUserData(data.email, data.senha,data.nome);
    //  if (writeUserData) {
    //    console.log('foi')
    //  } else {
    //    console.log('nao foi')
    // }

    //Verificação login

    //  const dbRef = ref(getDatabase());

    // get(child(dbRef, `usuarios/id/`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //    const usuariosData = snapshot.val();
    //   const emailParaVerificar = data.email;
    //   const senhaParaVerificar = data.senha;

    //   function verificarLoginNoArray(email, senha, array) {
    //    for (const usuario of array) {
    //      if (usuario && usuario.email === email && usuario.senha === senha) {
    //        return true
    //      }
    //    }
    //    return false; // O email não foi encontrado no array
    //   }

    // Chame a função de verificação e obtenha o resultado
    // const loginEstaNoArray = verificarLoginNoArray(emailParaVerificar, senhaParaVerificar, usuariosData);
    //  if (loginEstaNoArray) {
    //    console.log('foi')
    //    alert('foi')
    //  }
    //  else {
    //    console.log('nao foi')
    //    alert('não foi')
    //   }
    // } else {
    //   console.log("No data available");
    //  }
    //  }).catch((error) => {
    // console.error(error);
    // });


    //consulta com id

    //  const IdUsuario = 1
    //   const db = getDatabase();
    //  const usuariosRef = ref(db, "usuarios/id/" + IdUsuario);

    // Realizar a consulta no banco de dados usando a função get
    //  get(usuariosRef)
    //  .then((snapshot) => {
    //   if (snapshot.exists()) {
    //  const usuariosData = snapshot.val();

    // Armazene cada campo em suas respectivas variáveis
    //const nome = usuariosData.nome;
    //const idade = usuariosData.idade;
    //    const email = usuariosData.email;
    //    const senha = usuariosData.senha;

    // Agora você pode usar essas variáveis conforme necessário
    //console.log("Nome:", nome);
    //console.log("Idade:", idade);
    //      console.log("Email:", email);
    //      console.log("Senha:", senha);

    // Realize a verificação com os dados
    //      if (email === data.email && senha === data.senha) {
    //       console.log("Usuário encontrado no banco de dados.");
    //        alert('TROCAR DE TELA')
    //      } else {
    //        console.log("Os dados não correspondem aos dados salvos no banco de dados.");
    // Faça o que precisa ser feito quando os dados não correspondem
    //     }
    //   } else {
    //     console.log("Nenhum dado de usuário encontrado no banco de dados.");
    //    }
    //  })
    // .catch((error) => {
    //   console.error("Erro ao consultar o banco de dados:", error);
    // });
    //ler um dado so
    //  const db = getDatabase();
    //  const starCountRef = ref(db,"usuarios/id/1/");
    //  onValue(starCountRef, (snapshot) => {
    //    setNome(snapshot.val());
    //   setEmail(snapshot.val());
    //  setPassword(snapshot.val());
    // });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"

        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  }
});

export default App;
