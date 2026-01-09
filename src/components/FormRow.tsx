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

interface FormRowProps {
  label: string;
  value: string;
  onPress?: () => void;
  hasDropdown?: boolean;
  icon?: string;
  valueBackgroundColor?: string;
  valueColor?: string;
}

const FormRow = ({
  label,
  value,
  onPress,
  hasDropdown = false,
  icon,
  valueBackgroundColor,
  valueColor,
}: FormRowProps) => (
  <TouchableOpacity
    style={styles.formRow}
    onPress={onPress}
    activeOpacity={onPress ? 0.7 : 1}
    disabled={!onPress}
  >
    <Text style={styles.formLabel}>{label}</Text>
    <View style={styles.formValueContainer}>
      <View
        style={[
          styles.valueWrapper,
          valueBackgroundColor && { backgroundColor: valueBackgroundColor },
        ]}
      >
        <Text style={[styles.formValue, valueColor && { color: valueColor }]}>{value}</Text>
      </View>
      {hasDropdown && (
        <Icon
          name="chevron"
          width={getScaledSize(7)}
          height={getScaledSize(14)}
          color={theme.colors.text.tertiary}
        />
      )}
    </View>
  </TouchableOpacity>
);

export default FormRow;

const styles = StyleSheet.create({
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formLabel: {
    fontSize: getScaledSize(16),
    lineHeight: getScaledSize(22),
    color: theme.colors.text.tertiary,
    fontWeight: '400',
    paddingVertical: getScaledSize(4),
  },
  formValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueWrapper: {
    paddingHorizontal: getScaledSize(8),
    paddingVertical: getScaledSize(6),
    borderRadius: getScaledSize(6),
  },
  formValue: {
    fontSize: getScaledSize(16),
    lineHeight: getScaledSize(22),
    color: theme.colors.text.primary,
    fontWeight: '400',
    marginRight: getScaledSize(4),
  },
});