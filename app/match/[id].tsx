import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import { leagues } from '../../services/mockData';
import LiveBadge from '../../components/ui/LiveBadge';

export default function MatchDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { matches, favoriteMatches, toggleFavoriteMatch } = useApp();

  const match = matches.find(m => m.id === id);
  if (!match) return null;

  const isLive = match.status === 'live' || match.status === 'halftime';
  const isFinished = match.status === 'finished';
  const isFavorite = favoriteMatches.includes(match.id);
  const league = leagues.find(l => l.id === match.leagueId);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal': return 'sports-soccer';
      case 'yellow': return 'square';
      case 'red': return 'square';
      case 'substitution': return 'swap-horiz';
      case 'penalty': return 'sports-soccer';
      default: return 'circle';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'goal': return theme.primary;
      case 'yellow': return '#FFD600';
      case 'red': return '#FF1744';
      case 'substitution': return theme.info;
      case 'penalty': return theme.primary;
      default: return theme.textMuted;
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={[league?.color || theme.primary, theme.background]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.heroGradient}
          />
          <View style={styles.heroContent}>
            {/* Nav */}
            <View style={styles.nav}>
              <Pressable onPress={() => { Haptics.selectionAsync(); router.back(); }} style={styles.navBtn}>
                <MaterialIcons name="arrow-back" size={22} color="#FFF" />
              </Pressable>
              <View style={styles.navCenter}>
                <Text style={styles.navLeague}>{match.league}</Text>
              </View>
              <Pressable onPress={() => { Haptics.selectionAsync(); toggleFavoriteMatch(match.id); }} style={styles.navBtn}>
                <MaterialIcons name={isFavorite ? 'star' : 'star-outline'} size={22} color={isFavorite ? theme.warning : '#FFF'} />
              </Pressable>
            </View>

            {/* Match Score */}
            <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.matchContent}>
              <View style={styles.teamBlock}>
                <View style={styles.teamBigLogo}>
                  <Text style={styles.teamBigEmoji}>{match.homeTeam.logo}</Text>
                </View>
                <Text style={styles.teamBigName} numberOfLines={2}>{match.homeTeam.name}</Text>
              </View>

              <View style={styles.scoreBlock}>
                {isLive || isFinished ? (
                  <>
                    <View style={styles.scoreBig}>
                      <Text style={styles.scoreNum}>{match.homeScore}</Text>
                      <Text style={styles.scoreDash}>-</Text>
                      <Text style={styles.scoreNum}>{match.awayScore}</Text>
                    </View>
                    {isLive ? (
                      <View style={styles.statusLive}>
                        <LiveBadge size="medium" />
                        <Text style={styles.minuteText}>{match.minute}</Text>
                      </View>
                    ) : (
                      <Text style={styles.statusFinished}>FT</Text>
                    )}
                  </>
                ) : (
                  <>
                    <Text style={styles.vsText}>VS</Text>
                    <Text style={styles.timeText}>{match.startTime}</Text>
                    <Text style={styles.dateText}>{match.date}</Text>
                  </>
                )}
              </View>

              <View style={styles.teamBlock}>
                <View style={styles.teamBigLogo}>
                  <Text style={styles.teamBigEmoji}>{match.awayTeam.logo}</Text>
                </View>
                <Text style={styles.teamBigName} numberOfLines={2}>{match.awayTeam.name}</Text>
              </View>
            </Animated.View>
          </View>
        </View>

        {/* Watch Button */}
        <View style={styles.actionSection}>
          <Pressable
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              router.push({ pathname: '/player', params: { channelId: match.channelId, channelName: match.channelName } });
            }}
            style={({ pressed }) => [
              styles.watchButton,
              pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
            ]}
          >
            <MaterialIcons name="play-circle-filled" size={24} color="#FFFFFF" />
            <Text style={styles.watchButtonText}>شاهد على {match.channelName}</Text>
          </Pressable>
        </View>

        {/* Match Events */}
        {match.events.length > 0 && (
          <View style={styles.eventsSection}>
            <Text style={styles.sectionTitle}>أحداث المباراة</Text>
            <View style={styles.timeline}>
              {match.events.map((event, index) => (
                <Animated.View
                  key={event.id}
                  entering={FadeInDown.delay(index * 80).duration(300)}
                  style={[
                    styles.eventRow,
                    event.team === 'away' && styles.eventRowAway,
                  ]}
                >
                  {event.team === 'home' ? (
                    <>
                      <Text style={styles.eventPlayer}>{event.player}</Text>
                      <View style={[styles.eventIcon, { backgroundColor: getEventColor(event.type) + '20' }]}>
                        <MaterialIcons
                          name={getEventIcon(event.type)}
                          size={16}
                          color={getEventColor(event.type)}
                        />
                      </View>
                      <Text style={styles.eventMinute}>{event.minute}</Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.eventMinute}>{event.minute}</Text>
                      <View style={[styles.eventIcon, { backgroundColor: getEventColor(event.type) + '20' }]}>
                        <MaterialIcons
                          name={getEventIcon(event.type)}
                          size={16}
                          color={getEventColor(event.type)}
                        />
                      </View>
                      <Text style={styles.eventPlayer}>{event.player}</Text>
                    </>
                  )}
                </Animated.View>
              ))}
            </View>
          </View>
        )}

        {/* Match Info */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>معلومات المباراة</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <MaterialIcons name="emoji-events" size={20} color={theme.primary} />
              <Text style={styles.infoLabel}>البطولة</Text>
              <Text style={styles.infoValue}>{match.league}</Text>
            </View>
            <View style={styles.infoCard}>
              <MaterialIcons name="schedule" size={20} color={theme.primary} />
              <Text style={styles.infoLabel}>الموعد</Text>
              <Text style={styles.infoValue}>{match.startTime}</Text>
            </View>
            <View style={styles.infoCard}>
              <MaterialIcons name="live-tv" size={20} color={theme.primary} />
              <Text style={styles.infoLabel}>القناة</Text>
              <Text style={styles.infoValue} numberOfLines={1}>{match.channelName}</Text>
            </View>
            <View style={styles.infoCard}>
              <MaterialIcons name="calendar-today" size={20} color={theme.primary} />
              <Text style={styles.infoLabel}>التاريخ</Text>
              <Text style={styles.infoValue}>{match.date}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.background,
  },
  heroSection: {
    height: 280,
    position: 'relative',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  heroContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navCenter: {
    flex: 1,
    alignItems: 'center',
  },
  navLeague: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },
  matchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  teamBlock: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  teamBigLogo: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  teamBigEmoji: {
    fontSize: 32,
  },
  teamBigName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
    maxWidth: 90,
  },
  scoreBlock: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  scoreBig: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  scoreNum: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFF',
  },
  scoreDash: {
    fontSize: 28,
    fontWeight: '300',
    color: 'rgba(255,255,255,0.5)',
  },
  statusLive: {
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  minuteText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.live,
  },
  statusFinished: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
    letterSpacing: 1,
  },
  vsText: {
    fontSize: 28,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.5)',
  },
  timeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginTop: 4,
  },
  dateText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  actionSection: {
    padding: 16,
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primary,
    height: 54,
    borderRadius: theme.radius.medium,
    gap: 10,
    ...theme.shadow.card,
  },
  watchButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  eventsSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 14,
  },
  timeline: {
    gap: 8,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.surface,
    borderRadius: theme.radius.medium,
    padding: 12,
  },
  eventRowAway: {
    flexDirection: 'row-reverse',
  },
  eventIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventPlayer: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  eventMinute: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.textMuted,
    minWidth: 36,
    textAlign: 'center',
  },
  infoSection: {
    paddingHorizontal: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  infoCard: {
    width: '48%',
    backgroundColor: theme.surface,
    borderRadius: theme.radius.medium,
    padding: 14,
    gap: 6,
  },
  infoLabel: {
    fontSize: 12,
    color: theme.textMuted,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.textPrimary,
  },
});
