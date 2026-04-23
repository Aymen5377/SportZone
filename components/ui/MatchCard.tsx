import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { theme } from '../../constants/theme';
import { Match } from '../../services/mockData';
import LiveBadge from './LiveBadge';

interface MatchCardProps {
  match: Match;
  compact?: boolean;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export default function MatchCard({ match, compact = false, onFavorite, isFavorite }: MatchCardProps) {
  const router = useRouter();
  const isLive = match.status === 'live' || match.status === 'halftime';
  const isFinished = match.status === 'finished';

  const handlePress = () => {
    Haptics.selectionAsync();
    router.push(`/match/${match.id}`);
  };

  const handleFavorite = () => {
    Haptics.selectionAsync();
    onFavorite?.();
  };

  const getLeagueColor = () => {
    switch (match.leagueId) {
      case 'pl': return theme.premierLeague;
      case 'll': return theme.laLiga;
      case 'sa': return theme.serieA;
      case 'bl': return theme.bundesliga;
      case 'ucl': return theme.championsLeague;
      case 'rsl': return '#006233';
      default: return theme.primary;
    }
  };

  if (compact) {
    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.compactContainer,
          isLive && styles.liveGlow,
          pressed && { opacity: 0.8 },
        ]}
      >
        <View style={[styles.leagueStripe, { backgroundColor: getLeagueColor() }]} />
        <View style={styles.compactContent}>
          <View style={styles.compactTeams}>
            <View style={styles.compactTeamRow}>
              <Text style={styles.teamEmoji}>{match.homeTeam.logo}</Text>
              <Text style={[styles.compactTeamName, isLive && match.homeScore !== null && match.homeScore > (match.awayScore ?? 0) && { color: theme.primary }]} numberOfLines={1}>
                {match.homeTeam.name}
              </Text>
            </View>
            <View style={styles.compactTeamRow}>
              <Text style={styles.teamEmoji}>{match.awayTeam.logo}</Text>
              <Text style={[styles.compactTeamName, isLive && match.awayScore !== null && match.awayScore > (match.homeScore ?? 0) && { color: theme.primary }]} numberOfLines={1}>
                {match.awayTeam.name}
              </Text>
            </View>
          </View>
          <View style={styles.compactScoreArea}>
            {isLive || isFinished ? (
              <View style={styles.scoreCol}>
                <Text style={[styles.compactScore, isLive && { color: theme.primary }]}>{match.homeScore}</Text>
                <Text style={[styles.compactScore, isLive && { color: theme.primary }]}>{match.awayScore}</Text>
              </View>
            ) : (
              <View style={styles.timeCol}>
                <Text style={styles.upcomingTime}>{match.startTime}</Text>
              </View>
            )}
            {isLive && (
              <View style={styles.minuteBadge}>
                <Text style={styles.minuteText}>{match.minute}</Text>
              </View>
            )}
            {isFinished && (
              <Text style={styles.ftText}>FT</Text>
            )}
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        isLive && styles.liveGlow,
        pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.leagueInfo}>
          <View style={[styles.leagueDot, { backgroundColor: getLeagueColor() }]} />
          <Text style={styles.leagueName}>{match.league}</Text>
        </View>
        <View style={styles.headerRight}>
          {isLive && <LiveBadge size="small" />}
          {isFinished && <Text style={styles.finishedBadge}>FT</Text>}
          {!isLive && !isFinished && <Text style={styles.upcomingBadge}>{match.startTime}</Text>}
          {onFavorite && (
            <Pressable onPress={handleFavorite} hitSlop={8}>
              <MaterialIcons
                name={isFavorite ? 'star' : 'star-outline'}
                size={20}
                color={isFavorite ? theme.warning : theme.textMuted}
              />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.matchBody}>
        <View style={styles.teamSide}>
          <View style={styles.teamLogoContainer}>
            <Text style={styles.teamLogoText}>{match.homeTeam.logo}</Text>
          </View>
          <Text style={styles.teamName} numberOfLines={1}>{match.homeTeam.name}</Text>
        </View>

        <View style={styles.scoreCenter}>
          {isLive || isFinished ? (
            <>
              <View style={styles.scoreRow}>
                <Text style={[styles.score, isLive && { color: theme.primary }]}>
                  {match.homeScore}
                </Text>
                <Text style={styles.scoreDivider}>-</Text>
                <Text style={[styles.score, isLive && { color: theme.primary }]}>
                  {match.awayScore}
                </Text>
              </View>
              {isLive && (
                <View style={styles.minuteContainer}>
                  <View style={styles.minuteDotSmall} />
                  <Text style={styles.minuteLabel}>{match.minute}</Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>VS</Text>
              <Text style={styles.dateLabel}>{match.date}</Text>
            </View>
          )}
        </View>

        <View style={styles.teamSide}>
          <View style={styles.teamLogoContainer}>
            <Text style={styles.teamLogoText}>{match.awayTeam.logo}</Text>
          </View>
          <Text style={styles.teamName} numberOfLines={1}>{match.awayTeam.name}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <MaterialIcons name="live-tv" size={14} color={theme.textMuted} />
        <Text style={styles.channelText}>{match.channelName}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.surface,
    borderRadius: theme.radius.large,
    padding: 16,
    ...theme.shadow.card,
  },
  liveGlow: {
    borderWidth: 1,
    borderColor: 'rgba(176, 38, 255, 0.25)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  leagueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  leagueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  leagueName: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  finishedBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.textMuted,
    letterSpacing: 1,
  },
  upcomingBadge: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.primary,
  },
  matchBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  teamSide: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  teamLogoContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamLogoText: {
    fontSize: 24,
  },
  teamName: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textPrimary,
    textAlign: 'center',
    maxWidth: 100,
  },
  scoreCenter: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  score: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  scoreDivider: {
    fontSize: 20,
    fontWeight: '300',
    color: theme.textMuted,
  },
  minuteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  minuteDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.live,
  },
  minuteLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.live,
  },
  vsContainer: {
    alignItems: 'center',
  },
  vsText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.textMuted,
  },
  dateLabel: {
    fontSize: 12,
    color: theme.textMuted,
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  channelText: {
    fontSize: 12,
    color: theme.textMuted,
    fontWeight: '500',
  },
  // Compact styles
  compactContainer: {
    backgroundColor: theme.surface,
    borderRadius: theme.radius.medium,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  leagueStripe: {
    width: 3,
  },
  compactContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  compactTeams: {
    flex: 1,
    gap: 6,
  },
  compactTeamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teamEmoji: {
    fontSize: 16,
  },
  compactTeamName: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.textPrimary,
    flex: 1,
  },
  compactScoreArea: {
    alignItems: 'center',
    minWidth: 50,
  },
  scoreCol: {
    alignItems: 'center',
    gap: 4,
  },
  compactScore: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  timeCol: {
    alignItems: 'center',
  },
  upcomingTime: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.primary,
  },
  minuteBadge: {
    marginTop: 4,
    backgroundColor: 'rgba(255, 23, 68, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  minuteText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.live,
  },
  ftText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.textMuted,
    marginTop: 4,
    letterSpacing: 1,
  },
});
