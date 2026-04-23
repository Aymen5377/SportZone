import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { theme } from '../../constants/theme';
import { Channel } from '../../services/mockData';
import LiveBadge from './LiveBadge';

interface ChannelCardProps {
  channel: Channel;
  isFavorite: boolean;
  onFavorite: () => void;
}

export default function ChannelCard({ channel, isFavorite, onFavorite }: ChannelCardProps) {
  const router = useRouter();

  const handlePress = () => {
    Haptics.selectionAsync();
    router.push({ pathname: '/player', params: { channelId: channel.id, channelName: channel.name } });
  };

  const handleFavorite = () => {
    Haptics.selectionAsync();
    onFavorite();
  };

  const formatViewers = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  const getChannelNumber = () => {
    const match = channel.name.match(/\d+/);
    return match ? match[0] : '';
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        channel.isLive && styles.liveContainer,
        pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
      ]}
    >
      <View style={styles.leftSection}>
        <View style={[styles.logoContainer, channel.isLive && styles.logoContainerLive]}>
          <Text style={styles.channelNum}>{getChannelNumber()}</Text>
          <MaterialIcons name="live-tv" size={16} color={theme.primary} />
          {channel.isLive && (
            <View style={styles.liveDot} />
          )}
        </View>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{channel.name}</Text>
          <Text style={styles.currentShow} numberOfLines={1}>{channel.currentShow}</Text>
          <View style={styles.metaRow}>
            {channel.isLive && <LiveBadge size="small" />}
            <View style={styles.qualityBadge}>
              <Text style={styles.qualityText}>{channel.quality}</Text>
            </View>
            <View style={styles.viewersBadge}>
              <MaterialIcons name="visibility" size={11} color={theme.textMuted} />
              <Text style={styles.viewersText}>{formatViewers(channel.viewers)}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={handleFavorite} hitSlop={10}>
          <MaterialIcons
            name={isFavorite ? 'star' : 'star-outline'}
            size={22}
            color={isFavorite ? theme.warning : theme.textMuted}
          />
        </Pressable>
        <View style={styles.playButton}>
          <MaterialIcons name="play-arrow" size={20} color="#FFFFFF" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.surface,
    borderRadius: theme.radius.medium,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...theme.shadow.card,
  },
  liveContainer: {
    borderWidth: 1,
    borderColor: 'rgba(176, 38, 255, 0.2)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  logoContainer: {
    position: 'relative',
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  logoContainerLive: {
    backgroundColor: 'rgba(176, 38, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(176, 38, 255, 0.2)',
  },
  channelNum: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.primary,
  },
  liveDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.live,
    borderWidth: 2,
    borderColor: theme.surface,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  currentShow: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  qualityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: 'rgba(176, 38, 255, 0.12)',
    borderRadius: 4,
  },
  qualityText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.primary,
  },
  viewersBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewersText: {
    fontSize: 11,
    color: theme.textMuted,
    fontWeight: '500',
  },
  actions: {
    alignItems: 'center',
    gap: 10,
  },
  playButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
