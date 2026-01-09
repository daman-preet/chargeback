import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { theme } from '../theme';
import { getScaledSize } from '../utils/constants';

interface DeleteButtonProps {
  onPress: () => void;
}

const DeleteButton = ({ onPress }: DeleteButtonProps) => (
  <TouchableOpacity
    style={styles.deleteButton}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.deleteButtonText}>Delete</Text>
  </TouchableOpacity>
);

export default DeleteButton;

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: theme.colors.whiteBackground,
    borderRadius: getScaledSize(16),
    paddingVertical: getScaledSize(16),
    paddingHorizontal: getScaledSize(20),
    marginTop: getScaledSize(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  deleteButtonText: {
    fontSize: getScaledSize(16),
    lineHeight: getScaledSize(22),
    color: theme.colors.danger,
    fontWeight: '600',
  },
});