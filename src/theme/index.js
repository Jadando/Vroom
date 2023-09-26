import { useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

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
  const [Tema, setTema] = useState(Color.Light);

  const TrocaLight = () => {
    setTema(Color.Light);
    console.log("Tema alterado para claro");
  }

  const TrocaDark = () => {
    setTema(Color.Dark);
    console.log("Tema alterado para escuro");
  }

  return { Tema, TrocaLight, TrocaDark };
}

// Componente ThemeProviderWrapper que recebe children e aplica o tema
export function ThemeProviderWrapper({ children }) {
//  const { Tema } = useTema();

  return (
    <ThemeProvider theme={Color.Light}>
      {children}
    </ThemeProvider>
  );
}
