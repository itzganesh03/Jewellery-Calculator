import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
export function RateSkeleton() { return <View style={styles.root}><ActivityIndicator size="small" /><Text variant="bodyMedium">Fetching live market rates…</Text></View>; }
const styles = StyleSheet.create({ root: { paddingVertical: 22, alignItems: 'center', gap: 8 } });
