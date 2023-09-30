import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

export default function App() {
  const [typedText, setTypedText] = useState('');
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = () => {
    Clipboard.setString(typedText);
    alert("Texto Copiado!");
  }

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          placeholder="Digite Algum Texto Aqui..."
          onChangeText={typedText => setTypedText(typedText)}
          defaultValue={typedText}
          style={styles.textInput}
        />
        <Button
          onPress={copyToClipboard}
          title="Copiar Texto"
        />
        <Text style={styles.copiedText}>{copiedText}</Text>
        <Button
          onPress={fetchCopiedText}
          title="Ver Texto Copiado"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    textAlign: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: 'blue',
    marginBottom:20,
    fontSize: 20,
  },
  copiedText: {
    marginTop: 20,
    marginBottom:20,
    color: 'red',
    fontSize: 20,
  },
});