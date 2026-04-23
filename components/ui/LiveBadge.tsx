import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';

interface LiveBadgeProps {
  size?: 'small' | 'medium' | 'large';
}

export default function LiveBadge({ size = 'small' }: LiveBadgeProps) {
  const sizes = {
    small: { dot: 6, text: 10, px: 8, py: 3 },
    medium: { dot: 8, text: 12, px: 10, py: 4 },
    large: { dot: 10, text: 14, px: 12, py: 5 },
  };

  const s = sizes[size];

  return (
    <View style={[styles.container, { paddingHorizontal: s.px, paddingVertical: s.py }]}>
      <View
        style={[
          styles.dot,
          { width: s.dot, height: s.dot, borderRadius: s.dot / 2 },
        ]}
      />
      <Text style={[styles.text, { fontSize: s.text }]}>LIVE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 23, 68, 0.15)',
    borderRadius: 20,
    gap: 4,
  },
  dot: {
    backgroundColor: theme.live,
  },
  text: {
    color: theme.live,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
