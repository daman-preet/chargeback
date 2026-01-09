import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

import { theme } from '../theme';
import { getScaledSize } from '../utils/constants';

interface ToggleRowProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const TRACK_WIDTH = getScaledSize(51);
const TRACK_HEIGHT = getScaledSize(31);
const THUMB_SIZE = getScaledSize(27);
const THUMB_OFFSET = 2;
const THUMB_MAX_TRANSLATE = TRACK_WIDTH - THUMB_SIZE - THUMB_OFFSET;

const ToggleRow = ({ label, value, onValueChange }: ToggleRowProps) => {
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const translateX = useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [THUMB_OFFSET, THUMB_MAX_TRANSLATE],
      }),
    [animatedValue]
  );

  const trackColor = useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.colors.divider, theme.colors.success],
      }),
    [animatedValue]
  );

  const handleToggle = useCallback(() => {
    onValueChange(!value);
  }, [value, onValueChange]);

  return (
    <View style={styles.formRow}>
      <Text style={styles.formLabel}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleToggle}
      >
        <Animated.View
          style={[
            styles.track,
            {
              backgroundColor: trackColor,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.thumb,
              {
                transform: [{ translateX }],
              },
            ]}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default ToggleRow;

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
    paddingVertical: getScaledSize(4),
    fontWeight: '400',
  },
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: theme.colors.whiteBackground,
    position: 'absolute',
  },
});