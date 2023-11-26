// storageUtils.js
import AsyncStorage from '@react-native-async-storage/async-storage';
export const salvarDadosLocalmente = async (chave, valor) => {
    try {
        await AsyncStorage.setItem(chave, valor);
    } catch (error) {
        console.error('Erro ao salvar dados localmente:', error);
    }
};

export const carregarDadosLocalmente = async (chave, setTipoUser) => {
    try {
        const valor = await AsyncStorage.getItem(chave);
        if (valor !== null) {
            setTipoUser(valor);
        }
    } catch (error) {
        console.error('Erro ao carregar dados localmente:', error);
    }
};

export const excluirDadosLocalmente = async (chave) => {
    try {
        await AsyncStorage.removeItem(chave);
    } catch (error) {
        console.error('Erro ao excluir dados localmente:', error);
    }
};
