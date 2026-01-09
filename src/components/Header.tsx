import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { theme } from '../theme';
import { getScaledSize } from '../utils/constants';
import Icon from '../assets/svg/Icon';

interface HeaderProps {
  onBack: () => void;
  onSave: () => void;
  title: string;
  saveDisabled?: boolean;
}

const Header = ({ onBack, onSave, title, saveDisabled = false }: HeaderProps) => (
  <View style={styles.header}>
    <TouchableOpacity
      style={styles.headerButton}
      onPress={onBack}
      activeOpacity={0.7}
    >
      <Icon
        name="backArrow"
        width={getScaledSize(16)}
        height={getScaledSize(14)}
        color={theme.colors.text.primary}
      />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
    <TouchableOpacity
      onPress={onSave}
      activeOpacity={0.7}
      disabled={saveDisabled}
    >
      <Text style={[styles.saveButton, saveDisabled && styles.saveButtonDisabled]}>Save</Text>
    </TouchableOpacity>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getScaledSize(16),
    paddingVertical: getScaledSize(8),
    backgroundColor: theme.colors.background,
  },
  headerButton: {
    width: getScaledSize(44),
    height: getScaledSize(44),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.whiteBackground,
    borderRadius: getScaledSize(22),
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: getScaledSize(18),
    lineHeight: getScaledSize(26),
    fontWeight: '500',
    color: theme.colors.text.primary,
  },
  saveButton: {
    fontSize: getScaledSize(18),
    lineHeight: getScaledSize(26),
    fontWeight: '500',
    color: theme.colors.text.secondary,
  },
  saveButtonDisabled: {
    color: theme.colors.text.neutral,
    opacity: 0.5,
  },
});