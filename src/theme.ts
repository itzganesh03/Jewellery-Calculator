import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { GOLD } from './constants';
export const createTheme = (dark: boolean) => {
  const base = dark ? MD3DarkTheme : MD3LightTheme;
  return { ...base, roundness: 4, colors: { ...base.colors, primary: dark ? '#F2D29B' : '#6B1733', onPrimary: dark ? '#3A0D1C' : '#FFFFFF', secondary: GOLD, tertiary: '#8A6D12', background: dark ? '#20060F' : '#FFF8F3', surface: dark ? '#35101D' : '#FFFDFC', surfaceVariant: dark ? '#4D1D2D' : '#F8ECE4', outline: dark ? '#B98A98' : '#CDAEB7' } };
};
