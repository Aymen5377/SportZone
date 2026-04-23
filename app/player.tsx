import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../constants/theme';
import { useApp } from '../contexts/AppContext';
import LiveBadge from '../components/ui/LiveBadge';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function PlayerScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { channelId, channelName } = useLocalSearchParams<{ channelId: string; channelName: string }>();
  const { channels, favoriteChannels, toggleFavoriteChannel } = useApp();
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('HD');
  const [isLoading, setIsLoading] = useState(true);

  const channel = channels.find(c => c.id === channelId);
  const isFavorite = favoriteChannels.includes(channelId || '');
  const streamUrl = channel?.streamUrl || '';

  const player = useVideoPlayer(streamUrl ? { uri: streamUrl } : null, (p) => {
    if (streamUrl) {
      p.loop = true;
      p.play();
    }
  });

  useEffect(() => {
    if (streamUrl) {
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [streamUrl]);

  useEffect(() => {
    if (showControls) {
      const timer = setTimeout(() => setShowControls(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showControls]);

  const relatedChannels = channels
    .filter(c => c.id !== channelId && c.category === channel?.category && c.isLive)
    .slice(0, 4);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Video Area */}
      <Pressable
        style={styles.videoArea}
        onPress={() => setShowControls(!showControls)}
      >
        {streamUrl ? (
          <VideoView
            player={player}
            style={styles.videoBg}
            contentFit="cover"
            nativeControls={false}
          />
        ) : (
          <>
            <Image
              source={require('../assets/images/hero-banner.jpg')}
              style={styles.videoBg}
              contentFit="cover"
            />
            <View style={styles.videoOverlay} />
            <View style={styles.noStreamOverlay}>
              <MaterialIcons name="live-tv" size={48} color={theme.primary} />
              <Text style={styles.noStreamText}>البث غير متوفر حالياً</Text>
            </View>
          </>
        )}

        {/* Loading */}
        {isLoading && streamUrl ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={styles.loadingText}>جاري تحميل البث...</Text>
          </View>
        ) : null}

        {/* Controls Overlay */}
        {showControls ? (
          <View style={styles.controlsOverlay}>
            {/* Top gradient */}
            <LinearGradient
              colors={['rgba(0,0,0,0.8)', 'transparent']}
              style={styles.topGradient}
            />
            {/* Bottom gradient */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.bottomGradient}
            />

            {/* Top Controls */}
            <View style={styles.topControls}>
              <Pressable
                onPress={() => { Haptics.selectionAsync(); router.back(); }}
                style={styles.backButton}
              >
                <MaterialIcons name="arrow-back" size={24} color="#FFF" />
              </Pressable>
              <View style={styles.channelInfo}>
                <Text style={styles.channelTitle} numberOfLines={1}>
                  {channelName || channel?.name}
                </Text>
                {channel?.isLive ? <LiveBadge size="medium" /> : null}
              </View>
              <Pressable
                onPress={() => { Haptics.selectionAsync(); toggleFavoriteChannel(channelId || ''); }}
                style={styles.favButton}
              >
                <MaterialIcons
                  name={isFavorite ? 'star' : 'star-outline'}
                  size={24}
                  color={isFavorite ? theme.warning : '#FFF'}
                />
              </Pressable>
            </View>

            {/* Bottom Controls */}
            <View style={styles.bottomControls}>
              <View style={styles.showInfo}>
                <Text style={styles.showName}>
                  {channel?.currentShow || 'بث مباشر'}
                </Text>
                <View style={styles.viewerCount}>
                  <MaterialIcons name="visibility" size={14} color="rgba(255,255,255,0.6)" />
                  <Text style={styles.viewerText}>
                    {channel?.viewers ? `${(channel.viewers / 1000).toFixed(1)}K` : '0'}
                  </Text>
                </View>
              </View>
              <View style={styles.qualityRow}>
                {['SD', 'HD', 'FHD'].map(q => (
                  <Pressable
                    key={q}
                    onPress={() => { setQuality(q); Haptics.selectionAsync(); }}
                    style={[styles.qualityBtn, quality === q && styles.qualityBtnActive]}
                  >
                    <Text style={[styles.qualityBtnText, quality === q && styles.qualityBtnTextActive]}>
                      {q}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        ) : null}
      </Pressable>

      {/* Info Section Below Video */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoSection}>
          {/* Current Channel */}
          <View style={styles.currentChannel}>
            <View style={styles.currentChannelIcon}>
              <MaterialIcons name="live-tv" size={24} color={theme.primary} />
            </View>
            <View style={styles.currentChannelInfo}>
              <Text style={styles.currentChannelName}>{channel?.name}</Text>
              <Text style={styles.currentChannelShow}>{channel?.currentShow}</Text>
            </View>
            <View style={styles.qualityTag}>
              <Text style={styles.qualityTagText}>{quality}</Text>
            </View>
          </View>

          {/* Stream URL indicator */}
          {streamUrl ? (
            <View style={styles.streamStatus}>
              <View style={styles.streamDot} />
              <Text style={styles.streamStatusText}>البث متصل</Text>
            </View>
          ) : null}

          {/* Separator */}
          <View style={styles.separator} />

          {/* Related Channels */}
          {relatedChannels.length > 0 ? (
            <View>
              <Text style={styles.relatedTitle}>قنوات أخرى مباشرة</Text>
              <View style={styles.relatedList}>
                {relatedChannels.map(rc => (
                  <Pressable
                    key={rc.id}
                    onPress={() => {
                      Haptics.selectionAsync();
                      router.replace({ pathname: '/player', params: { channelId: rc.id, channelName: rc.name } });
                    }}
                    style={({ pressed }) => [
                      styles.relatedItem,
                      pressed && { opacity: 0.7 },
                    ]}
                  >
                    <View style={styles.relatedIcon}>
                      <MaterialIcons name="live-tv" size={18} color={theme.primary} />
                    </View>
                    <View style={styles.relatedInfo}>
                      <Text style={styles.relatedName} numberOfLines={1}>{rc.name}</Text>
                      <Text style={styles.relatedShow} numberOfLines={1}>{rc.currentShow}</Text>
                    </View>
                    <MaterialIcons name="play-circle-filled" size={28} color={theme.primary} />
                  </Pressable>
                ))}
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  videoArea: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 9 / 16,
    backgroundColor: '#000',
    position: 'relative',
  },
  videoBg: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  noStreamOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  noStreamText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  topControls: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  channelInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  channelTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    flex: 1,
  },
  favButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomControls: {
    padding: 12,
    gap: 8,
    zIndex: 10,
  },
  showInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  showName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  viewerCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewerText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
  },
  qualityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  qualityBtn: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  qualityBtnActive: {
    backgroundColor: theme.primary,
  },
  qualityBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
  },
  qualityBtnTextActive: {
    color: '#FFFFFF',
  },
  infoSection: {
    padding: 16,
  },
  currentChannel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  currentChannelIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(176, 38, 255, 0.2)',
  },
  currentChannelInfo: {
    flex: 1,
  },
  currentChannelName: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  currentChannelShow: {
    fontSize: 13,
    color: theme.textSecondary,
    marginTop: 2,
  },
  qualityTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(176, 38, 255, 0.15)',
  },
  qualityTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.primary,
  },
  streamStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  streamDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00E676',
  },
  streamStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00E676',
  },
  separator: {
    height: 1,
    backgroundColor: theme.border,
    marginVertical: 16,
  },
  relatedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 12,
  },
  relatedList: {
    gap: 10,
  },
  relatedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: theme.radius.medium,
    padding: 12,
    gap: 12,
  },
  relatedIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: theme.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  relatedInfo: {
    flex: 1,
  },
  relatedName: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  relatedShow: {
    fontSize: 12,
    color: theme.textMuted,
    marginTop: 2,
  },
});
