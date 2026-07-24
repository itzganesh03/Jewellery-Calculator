import { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { IconButton, Searchbar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FadeInCard } from '../components/FadeInCard';
import { PURITY_LABELS } from '../constants';
import { shareCalculation } from '../services/pdfService';
import { storage } from '../storage/storage';
import { CalculationResult } from '../types';
import { dateTime, money } from '../utils/calculation';

export function HistoryScreen() {
  const [items, setItems] = useState<CalculationResult[]>([]);
  const [query, setQuery] = useState('');
  const load = useCallback(() => { storage.getHistory().then(setItems); }, []);
  useFocusEffect(load);
  const remove = (createdAt: string) => Alert.alert('Delete calculation?', 'This saved calculation will be removed.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: async () => { const next = items.filter(i => i.createdAt !== createdAt); setItems(next); await storage.saveHistory(next); } }]);
  const clear = () => Alert.alert('Clear all history?', 'This cannot be undone.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Clear all', style: 'destructive', onPress: async () => { setItems([]); await storage.saveHistory([]); } }]);
  const filtered = items.filter(i => `${PURITY_LABELS[i.purity]} ${i.total}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'right', 'left']}>
      <View style={styles.root}>
        <View style={styles.head}>
          <Text variant="headlineSmall" style={styles.title}>Calculation history</Text>
          {items.length > 0 && <IconButton icon="delete-sweep-outline" onPress={clear} accessibilityLabel="Clear all history"/>}
        </View>
        <Searchbar value={query} onChangeText={setQuery} placeholder="Search by metal or amount" style={styles.search}/>
        <FlatList
          data={filtered}
          keyExtractor={i => i.createdAt}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text variant="titleMedium">No saved calculations</Text>
              <Text variant="bodyMedium">Your completed estimates will appear here.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <FadeInCard style={styles.item}>
              <View style={styles.itemPad}>
                <View>
                  <Text variant="titleMedium">{PURITY_LABELS[item.purity]}</Text>
                  <Text variant="bodySmall">{item.weight} gm · {dateTime(item.createdAt)}</Text>
                  <Text variant="titleLarge" style={styles.amount}>{money(item.total)}</Text>
                </View>
                <View>
                  <IconButton icon="file-pdf-box" onPress={() => shareCalculation(item)} accessibilityLabel="Export calculation" />
                  <IconButton icon="delete-outline" onPress={() => remove(item.createdAt)} accessibilityLabel="Delete calculation" />
                </View>
              </View>
            </FadeInCard>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  root: { flex: 1, padding: 16 },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontWeight: '800' },
  search: { marginVertical: 14 },
  list: { gap: 10, paddingBottom: 20 },
  item: { borderRadius: 16, overflow: 'hidden' },
  itemPad: { padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  amount: { marginTop: 7, fontWeight: '800' },
  empty: { alignItems: 'center', paddingTop: 80, gap: 6, opacity: .65 },
});
