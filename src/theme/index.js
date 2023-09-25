import { useColorScheme } from 'react-native';
import React, { useState, useEffect, useReducer } from 'react';

export const Color = {
  Dark: {
    background: '#f2f2f2',
    color: '#f2f2f2',
  },
  Light: {
    background: '#313338',
    content: '#181818',
    color: '#f2f2f2',
  },
};

export function useTema() {
  const deviceTheme = useColorScheme();
  const [Tema, setTheme] = useState(deviceTheme === 'light' ? Color.Light : Color.Dark);

   useEffect(() => {
      setTheme(deviceTheme === 'light' ? Color.Light : Color.Dark);
   }, []);

  const TrocaLight = () => {
    setTheme(Color.Light);
    console.log("branco");
  }

  const TrocaDark = () => {
    setTheme(Color.Dark);
    console.log("Preto");
  }

  return {Tema, TrocaLight, TrocaDark };
}
