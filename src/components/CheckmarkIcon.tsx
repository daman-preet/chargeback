import React from 'react';
import { View, StyleSheet } from 'react-native';

import Icon from '../assets/svg/Icon';
import { theme } from '../theme';
import { getScaledSize } from '../utils/constants';

interface CheckmarkIconProps {
  size?: number;
  color?: string;
}

const CheckmarkIcon = ({ size, color }: CheckmarkIconProps) => {
  const iconSize = size ?? getScaledSize(17);
  const iconColor = color ?? theme.colors.text.secondary;

  return (
    <View style={styles.container}>
      <Icon
        name="checkmark"
        width={iconSize}
        height={iconSize}
        color={iconColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CheckmarkIcon;

