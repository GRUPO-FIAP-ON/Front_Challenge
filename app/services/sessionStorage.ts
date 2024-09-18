import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Salva dados na sessão usando AsyncStorage.
 * @param key Chave para armazenar o valor.
 * @param value Valor a ser armazenado.
 */
export async function saveSessionData(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('Failed to save session data:', e);
  }
}

/**
 * Recupera dados da sessão usando AsyncStorage.
 * @param key Chave do valor a ser recuperado.
 * @returns Valor armazenado ou null se não encontrado.
 */
export async function getSessionData(key: string): Promise<string | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error('Failed to retrieve session data:', e);
    return null;
  }
}

/**
 * Remove dados da sessão usando AsyncStorage.
 * @param key Chave do valor a ser removido.
 */
export async function removeSessionData(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Failed to remove session data:', e);
  }
}
