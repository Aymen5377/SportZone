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
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import { leagues } from '../../services/mockData';
import MatchCard from '../../components/ui/MatchCard';
import LiveBadge from '../../components/ui/LiveBadge';
import SectionHeader from '../../components/ui/SectionHeader';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { matches, favoriteMatches, toggleFavoriteMatch, channels } = useApp();
  const [selectedLeague, setSelectedLeague] = useState('all');

  const liveMatches = matches.filter(m => m.status === 'live' || m.status === 'halftime');
  const upcomingMatches = matches.filter(m => m.status === 'upcoming');
  const finishedMatches = matches.filter(m => m.status === 'finished');
  const liveChannelCount = channels.filter(c => c.isLive).length;

  const filteredLive = selectedLeague === 'all'
    ? liveMatches
    : liveMatches.filter(m => m.leagueId === selectedLeague);
  const filteredUpcoming = selectedLeague === 'all'
    ? upcomingMatches
    : upcomingMatches.filter(m => m.leagueId === selectedLeague);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image
            source={require('../../assets/images/hero-banner.jpg')}
            style={styles.heroImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['rgba(8,6,14,0.3)', 'rgba(8,6,14,0.85)', 'rgba(8,6,14,1)']}
            style={styles.heroGradient}
          />
          <View style={styles.heroContent}>
            <View style={styles.heroTop}>
              <View>
                <Text style={styles.appName}>bein</Text>
                <Text style={styles.appNameSub}>CONNECT</Text>
              </View>
              <View style={styles.heroStats}>
                <View style={styles.heroStatBadge}>
                  <View style={styles.liveIndicator} />
                  <Text style={styles.heroStatText}>{liveMatches.length} مباشر</Text>
                </View>
                <View style={styles.heroStatBadge2}>
                  <MaterialIcons name="live-tv" size={14} color={theme.primary} />
                  <Text style={styles.heroStatText2}>{liveChannelCount} قناة</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* League Filter */}
        <View style={styles.filterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            <Pressable
              onPress={() => { setSelectedLeague('all'); Haptics.selectionAsync(); }}
              style={[styles.filterChip, selectedLeague === 'all' && styles.filterChipActive]}
            >
              <Text style={[styles.filterChipText, selectedLeague === 'all' && styles.filterChipTextActive]}>
                الكل
              </Text>
            </Pressable>
            {leagues.map(league => (
              <Pressable
                key={league.id}
                onPress={() => { setSelectedLeague(league.id); Haptics.selectionAsync(); }}
                style={[
                  styles.filterChip,
                  selectedLeague === league.id && styles.filterChipActive,
                ]}
              >
                <Text style={styles.filterChipEmoji}>{league.logo}</Text>
                <Text style={[styles.filterChipText, selectedLeague === league.id && styles.filterChipTextActive]}>
                  {league.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Live Matches */}
        {filteredLive.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionPadding}>
              <SectionHeader
                title="مباريات مباشرة"
                icon="sports-soccer"
                count={filteredLive.length}
              />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.liveScroll}
            >
              {filteredLive.map(match => (
                <View key={match.id} style={styles.liveCardWrapper}>
                  <MatchCard
                    match={match}
                    isFavorite={favoriteMatches.includes(match.id)}
                    onFavorite={() => toggleFavoriteMatch(match.id)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Quick Channels */}
        <View style={[styles.section, styles.sectionPadding]}>
          <SectionHeader
            title="قنوات مباشرة"
            icon="live-tv"
            actionText="عرض الكل"
            onAction={() => router.push('/(tabs)/channels')}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {channels.filter(c => c.isLive).slice(0, 8).map(channel => (
              <Pressable
                key={channel.id}
                onPress={() => {
                  Haptics.selectionAsync();
                  router.push({ pathname: '/player', params: { channelId: channel.id, channelName: channel.name } });
                }}
                style={({ pressed }) => [
                  styles.quickChannel,
                  pressed && { opacity: 0.8 },
                ]}
              >
                <View style={styles.quickChannelIcon}>
                  <MaterialIcons name="live-tv" size={20} color={theme.primary} />
                  <View style={styles.quickChannelLive} />
                </View>
                <Text style={styles.quickChannelName} numberOfLines={1}>{channel.name}</Text>
                <Text style={styles.quickChannelShow} numberOfLines={1}>{channel.quality}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Matches */}
        {filteredUpcoming.length > 0 && (
          <View style={[styles.section, styles.sectionPadding]}>
            <SectionHeader
              title="مباريات قادمة"
              icon="schedule"
              count={filteredUpcoming.length}
              actionText="الجدول الكامل"
              onAction={() => router.push('/(tabs)/schedule')}
            />
            <View style={styles.upcomingList}>
              {filteredUpcoming.map(match => (
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
        )}

        {/* Finished Matches */}
        {finishedMatches.length > 0 && (
          <View style={[styles.section, styles.sectionPadding]}>
            <SectionHeader title="نتائج اليوم" icon="scoreboard" count={finishedMatches.length} />
            <View style={styles.upcomingList}>
              {finishedMatches.map(match => (
                <MatchCard key={match.id} match={match} compact />
              ))}
            </View>
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
  heroBanner: {
    height: 220,
    position: 'relative',
    marginBottom: 4,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 16,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  appNameSub: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.primary,
    letterSpacing: 6,
    marginTop: -4,
  },
  heroStats: {
    gap: 6,
    alignItems: 'flex-end',
  },
  heroStatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 23, 68, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 6,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.live,
  },
  heroStatText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF5252',
  },
  heroStatBadge2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(176, 38, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 6,
  },
  heroStatText2: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.primary,
  },
  filterSection: {
    paddingTop: 12,
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: theme.surface,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: theme.border,
  },
  filterChipActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  filterChipEmoji: {
    fontSize: 14,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  section: {
    marginTop: 20,
  },
  sectionPadding: {
    paddingHorizontal: 16,
  },
  liveScroll: {
    paddingHorizontal: 16,
    gap: 14,
  },
  liveCardWrapper: {
    width: 300,
  },
  quickChannel: {
    width: 90,
    alignItems: 'center',
    gap: 6,
  },
  quickChannelIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: theme.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.border,
    position: 'relative',
  },
  quickChannelLive: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.live,
    borderWidth: 2,
    borderColor: theme.background,
  },
  quickChannelName: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.textPrimary,
    textAlign: 'center',
  },
  quickChannelShow: {
    fontSize: 10,
    color: theme.textMuted,
    textAlign: 'center',
  },
  upcomingList: {
    gap: 8,
  },
});
