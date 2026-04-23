import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

interface SectionHeaderProps {
  title: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  actionText?: string;
  onAction?: () => void;
  count?: number;
}

export default function SectionHeader({ title, icon, actionText, onAction, count }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {icon && <MaterialIcons name={icon} size={20} color={theme.primary} />}
        <Text style={styles.title}>{title}</Text>
        {count !== undefined && (
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{count}</Text>
          </View>
        )}
      </View>
      {actionText && onAction && (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={styles.action}>{actionText}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 8,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  countBadge: {
    backgroundColor: theme.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.primary,
  },
  action: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.primary,
  },
});
