import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { theme } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import { leagues } from '../../services/mockData';
import MatchCard from '../../components/ui/MatchCard';
import SectionHeader from '../../components/ui/SectionHeader';

const days = [
  { id: 'today', label: 'اليوم' },
  { id: 'tomorrow', label: 'غداً' },
  { id: 'wed', label: 'الأربعاء' },
  { id: 'sat', label: 'السبت' },
];

export default function ScheduleScreen() {
  const insets = useSafeAreaInsets();
  const { matches, favoriteMatches, toggleFavoriteMatch } = useApp();
  const [selectedDay, setSelectedDay] = useState('today');
  const [selectedLeague, setSelectedLeague] = useState('all');

  const dayToDate: Record<string, string> = {
    today: 'اليوم',
    tomorrow: 'غداً',
    wed: 'الأربعاء',
    sat: 'السبت',
  };

  const filteredMatches = useMemo(() => {
    let result = matches.filter(m => m.date === dayToDate[selectedDay]);
    if (selectedLeague !== 'all') {
      result = result.filter(m => m.leagueId === selectedLeague);
    }
    return result;
  }, [matches, selectedDay, selectedLeague]);

  const groupedByLeague = useMemo(() => {
    const groups: Record<string, typeof matches> = {};
    filteredMatches.forEach(m => {
      if (!groups[m.league]) groups[m.league] = [];
      groups[m.league].push(m);
    });
    return groups;
  }, [filteredMatches]);

  const liveCount = filteredMatches.filter(m => m.status === 'live' || m.status === 'halftime').length;

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>جدول المباريات</Text>
        <Text style={styles.subtitle}>
          {filteredMatches.length} مباراة {liveCount > 0 ? `• ${liveCount} مباشرة` : ''}
        </Text>
      </View>

      {/* Day Selector */}
      <View style={styles.daySelector}>
        {days.map(day => (
          <Pressable
            key={day.id}
            onPress={() => { setSelectedDay(day.id); Haptics.selectionAsync(); }}
            style={[styles.dayChip, selectedDay === day.id && styles.dayChipActive]}
          >
            <Text style={[styles.dayText, selectedDay === day.id && styles.dayTextActive]}>
              {day.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* League Filter */}
      <View style={styles.leagueFilter}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.leagueScroll}
        >
          <Pressable
            onPress={() => { setSelectedLeague('all'); Haptics.selectionAsync(); }}
            style={[styles.leagueChip, selectedLeague === 'all' && styles.leagueChipActive]}
          >
            <Text style={[styles.leagueText, selectedLeague === 'all' && styles.leagueTextActive]}>
              كل الدوريات
            </Text>
          </Pressable>
          {leagues.map(league => (
            <Pressable
              key={league.id}
              onPress={() => { setSelectedLeague(league.id); Haptics.selectionAsync(); }}
              style={[
                styles.leagueChip,
                selectedLeague === league.id && { backgroundColor: league.color, borderColor: league.color },
              ]}
            >
              <Text style={styles.leagueEmoji}>{league.logo}</Text>
              <Text style={[styles.leagueText, selectedLeague === league.id && styles.leagueTextActive]}>
                {league.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Matches */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 16 }}
        showsVerticalScrollIndicator={false}
      >
        {Object.keys(groupedByLeague).length > 0 ? (
          Object.entries(groupedByLeague).map(([league, leagueMatches]) => (
            <View key={league} style={styles.leagueGroup}>
              <View style={styles.leagueHeader}>
                <View style={[styles.leagueHeaderDot, { backgroundColor: leagueMatches[0] ? (leagues.find(l => l.id === leagueMatches[0].leagueId)?.color || theme.primary) : theme.primary }]} />
                <Text style={styles.leagueHeaderText}>{league}</Text>
                <Text style={styles.leagueMatchCount}>{leagueMatches.length} مباريات</Text>
              </View>
              <View style={styles.matchList}>
                {leagueMatches.map(match => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    compact
                    isFavorite={favoriteMatches.includes(match.id)}
                    onFavorite={() => toggleFavoriteMatch(match.id)}
                  />
                ))}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="event-busy" size={56} color={theme.textMuted} />
            <Text style={styles.emptyTitle}>لا توجد مباريات</Text>
            <Text style={styles.emptySubtitle}>لا توجد مباريات في هذا اليوم</Text>
          </View>
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
  daySelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
  },
  dayChip: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: theme.surface,
    borderRadius: theme.radius.medium,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  dayChipActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  dayTextActive: {
    color: theme.background,
  },
  leagueFilter: {
    marginBottom: 12,
  },
  leagueScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  leagueChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: theme.surface,
    borderRadius: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: theme.border,
  },
  leagueChipActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  leagueEmoji: {
    fontSize: 13,
  },
  leagueText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  leagueTextActive: {
    color: '#FFFFFF',
  },
  leagueGroup: {
    marginBottom: 20,
  },
  leagueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  leagueHeaderDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  leagueHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.textPrimary,
    flex: 1,
  },
  leagueMatchCount: {
    fontSize: 12,
    color: theme.textMuted,
    fontWeight: '500',
  },
  matchList: {
    gap: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 80,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  emptySubtitle: {
    fontSize: 14,
    color: theme.textMuted,
  },
});
