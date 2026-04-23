import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import * as Haptics from 'expo-haptics';
import { theme } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import ChannelCard from '../../components/ui/ChannelCard';

const categories = [
  { id: 'ALL', name: 'الكل' },
  { id: 'BEIN', name: 'beIN Sports' },
  { id: 'SSC', name: 'SSC' },
  { id: 'OTHER', name: 'قنوات أخرى' },
];

export default function ChannelsScreen() {
  const insets = useSafeAreaInsets();
  const { channels, favoriteChannels, toggleFavoriteChannel } = useApp();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLiveOnly, setShowLiveOnly] = useState(false);

  const filteredChannels = useMemo(() => {
    let result = channels;
    if (activeCategory !== 'ALL') {
      result = result.filter(c => c.category === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.currentShow.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (showLiveOnly) {
      result = result.filter(c => c.isLive);
    }
    return result.sort((a, b) => (b.isLive ? 1 : 0) - (a.isLive ? 1 : 0));
  }, [channels, activeCategory, searchQuery, showLiveOnly]);

  const liveCount = channels.filter(c => c.isLive).length;

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>القنوات</Text>
          <Text style={styles.subtitle}>{channels.length} قناة • {liveCount} مباشرة الآن</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={20} color={theme.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث عن قناة..."
            placeholderTextColor={theme.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <MaterialIcons name="close" size={18} color={theme.textMuted} />
            </Pressable>
          )}
        </View>
        <Pressable
          onPress={() => { setShowLiveOnly(!showLiveOnly); Haptics.selectionAsync(); }}
          style={[styles.liveFilter, showLiveOnly && styles.liveFilterActive]}
        >
          <View style={[styles.liveFilterDot, showLiveOnly && styles.liveFilterDotActive]} />
          <Text style={[styles.liveFilterText, showLiveOnly && styles.liveFilterTextActive]}>مباشر</Text>
        </Pressable>
      </View>

      {/* Categories */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map(cat => (
            <Pressable
              key={cat.id}
              onPress={() => { setActiveCategory(cat.id); Haptics.selectionAsync(); }}
              style={[styles.categoryChip, activeCategory === cat.id && styles.categoryChipActive]}
            >
              <Text style={[styles.categoryText, activeCategory === cat.id && styles.categoryTextActive]}>
                {cat.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Channel List */}
      <View style={{ flex: 1 }}>
        <FlashList
          data={filteredChannels}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ChannelCard
                channel={item}
                isFavorite={favoriteChannels.includes(item.id)}
                onFavorite={() => toggleFavoriteChannel(item.id)}
              />
            </View>
          )}
          keyExtractor={item => item.id}
          estimatedItemSize={90}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 16 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="search-off" size={48} color={theme.textMuted} />
              <Text style={styles.emptyText}>لا توجد قنوات مطابقة</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: theme.textSecondary,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: theme.radius.medium,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: theme.textPrimary,
  },
  liveFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 44,
    backgroundColor: theme.surface,
    borderRadius: theme.radius.medium,
    gap: 6,
    borderWidth: 1,
    borderColor: theme.border,
  },
  liveFilterActive: {
    backgroundColor: 'rgba(255, 23, 68, 0.15)',
    borderColor: theme.live,
  },
  liveFilterDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.textMuted,
  },
  liveFilterDotActive: {
    backgroundColor: theme.live,
  },
  liveFilterText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textMuted,
  },
  liveFilterTextActive: {
    color: theme.live,
  },
  categoriesWrapper: {
    marginBottom: 8,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.border,
  },
  categoryChipActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  categoryTextActive: {
    color: theme.background,
  },
  cardWrapper: {
    marginBottom: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    color: theme.textMuted,
    fontWeight: '500',
  },
});
