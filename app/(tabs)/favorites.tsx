import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { theme } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import MatchCard from '../../components/ui/MatchCard';
import ChannelCard from '../../components/ui/ChannelCard';
import SectionHeader from '../../components/ui/SectionHeader';

type TabType = 'matches' | 'channels';

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const {
    matches,
    channels,
    favoriteMatches,
    favoriteChannels,
    toggleFavoriteMatch,
    toggleFavoriteChannel,
  } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('matches');

  const favMatchList = matches.filter(m => favoriteMatches.includes(m.id));
  const favChannelList = channels.filter(c => favoriteChannels.includes(c.id));

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>المفضلة</Text>
        <Text style={styles.subtitle}>
          {favMatchList.length} مباراة • {favChannelList.length} قناة
        </Text>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <Pressable
          onPress={() => { setActiveTab('matches'); Haptics.selectionAsync(); }}
          style={[styles.tab, activeTab === 'matches' && styles.tabActive]}
        >
          <MaterialIcons
            name="sports-soccer"
            size={18}
            color={activeTab === 'matches' ? theme.primary : theme.textMuted}
          />
          <Text style={[styles.tabText, activeTab === 'matches' && styles.tabTextActive]}>
            المباريات
          </Text>
          {favMatchList.length > 0 && (
            <View style={[styles.tabBadge, activeTab === 'matches' && styles.tabBadgeActive]}>
              <Text style={[styles.tabBadgeText, activeTab === 'matches' && styles.tabBadgeTextActive]}>
                {favMatchList.length}
              </Text>
            </View>
          )}
        </Pressable>
        <Pressable
          onPress={() => { setActiveTab('channels'); Haptics.selectionAsync(); }}
          style={[styles.tab, activeTab === 'channels' && styles.tabActive]}
        >
          <MaterialIcons
            name="live-tv"
            size={18}
            color={activeTab === 'channels' ? theme.primary : theme.textMuted}
          />
          <Text style={[styles.tabText, activeTab === 'channels' && styles.tabTextActive]}>
            القنوات
          </Text>
          {favChannelList.length > 0 && (
            <View style={[styles.tabBadge, activeTab === 'channels' && styles.tabBadgeActive]}>
              <Text style={[styles.tabBadgeText, activeTab === 'channels' && styles.tabBadgeTextActive]}>
                {favChannelList.length}
              </Text>
            </View>
          )}
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 16 }}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'matches' ? (
          favMatchList.length > 0 ? (
            <View style={styles.list}>
              {favMatchList.map(match => (
                <MatchCard
                  key={match.id}
                  match={match}
                  isFavorite
                  onFavorite={() => toggleFavoriteMatch(match.id)}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Image
                source={require('../../assets/images/empty-state.png')}
                style={styles.emptyImage}
                contentFit="contain"
              />
              <Text style={styles.emptyTitle}>لا توجد مباريات مفضلة</Text>
              <Text style={styles.emptySubtitle}>
                أضف مبارياتك المفضلة لمتابعتها بسهولة
              </Text>
            </View>
          )
        ) : (
          favChannelList.length > 0 ? (
            <View style={styles.list}>
              {favChannelList.map(channel => (
                <ChannelCard
                  key={channel.id}
                  channel={channel}
                  isFavorite
                  onFavorite={() => toggleFavoriteChannel(channel.id)}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Image
                source={require('../../assets/images/empty-state.png')}
                style={styles.emptyImage}
                contentFit="contain"
              />
              <Text style={styles.emptyTitle}>لا توجد قنوات مفضلة</Text>
              <Text style={styles.emptySubtitle}>
                أضف قنواتك المفضلة للوصول السريع
              </Text>
            </View>
          )
        )}
      </ScrollView>
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
    paddingBottom: 8,
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: theme.surface,
    borderRadius: theme.radius.medium,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.border,
  },
  tabActive: {
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    borderColor: theme.primary,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.textMuted,
  },
  tabTextActive: {
    color: theme.primary,
  },
  tabBadge: {
    backgroundColor: theme.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(0, 230, 118, 0.2)',
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.textMuted,
  },
  tabBadgeTextActive: {
    color: theme.primary,
  },
  list: {
    gap: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyImage: {
    width: 160,
    height: 160,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  emptySubtitle: {
    fontSize: 14,
    color: theme.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});
