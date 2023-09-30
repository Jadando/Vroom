import { useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

export const Color = {
  Dark: {
    background: '#f2f2f2',
    color: '#f2f2f2',
    borderColor:'#000'
  },
  Light: {
    background: '#313338',
    content: '#181818',
    color: '#f2f2f2',
  },
};

export function useTema() {
  const deviceTheme = useColorScheme();
  const [Tema, setTheme] = useState(Color.Light);
  //==useEffect(() => {
  //     setTheme(deviceTheme === 'light' ? Color.Light : Color.Dark);
  //}, []);

  const TrocaLight = () => {
    setTheme(Color.Light);
    console.log(Tema)
    console.log("Tema alterado para claro");
  }

  const TrocaDark = () => {
    setTheme(Color.Dark);
    console.log(Tema)
    console.log("Tema alterado para escuro");
  }

  return { Tema, TrocaLight, TrocaDark };
}
