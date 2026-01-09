import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';

import BaseBottomSheet from './BaseBottomSheet';
import { theme } from '../theme';
import { getScaledSize } from '../utils/constants';
import CheckmarkIcon from './CheckmarkIcon';

export interface FrequencyItem {
  id: string;
  name: string;
}

interface Props {
  bottomSheetRef: React.RefObject<any>;
  value: string;
  onConfirm: (frequencyName: string) => void;
  frequencies: FrequencyItem[];
}

const FrequencyBottomSheet = ({
  bottomSheetRef,
  value,
  onConfirm,
  frequencies,
}: Props) => {
  const [tempSelectedFrequency, setTempSelectedFrequency] = useState<string | null>(null);

  const selectedFrequency = tempSelectedFrequency !== null ? tempSelectedFrequency : value;

  const handleDone = useCallback(() => {
    onConfirm(selectedFrequency);
    setTempSelectedFrequency(null);
  }, [selectedFrequency, onConfirm]);

  const handleDismiss = useCallback(() => {
    setTempSelectedFrequency(null);
  }, []);

  const handleSheetChange = useCallback((index: number) => {
    if (index >= 0) {
      setTempSelectedFrequency(null);
    }
  }, []);

  const handleSelectFrequency = useCallback((frequencyName: string) => {
    setTempSelectedFrequency(frequencyName);
  }, []);

  const renderFrequencyItem = useCallback(
    ({ item, index }: { item: FrequencyItem; index: number }) => {
      const isSelected = item.name === selectedFrequency;
      const isLastItem = index === frequencies.length - 1;
      
      return (
        <View>
          <TouchableOpacity
            style={styles.frequencyItem}
            onPress={() => handleSelectFrequency(item.name)}
            activeOpacity={0.7}
          >
            <Text style={styles.frequencyName}>{item.name}</Text>
            {isSelected && <CheckmarkIcon />}
          </TouchableOpacity>
          {!isLastItem && (
            <View style={styles.separator} />
          )}
        </View>
      );
    },
    [selectedFrequency, handleSelectFrequency, frequencies.length]
  );

  return (
    <BaseBottomSheet
      bottomSheetRef={bottomSheetRef}
      title="Frequency"
      onDone={handleDone}
      onDismiss={handleDismiss}
      onChange={handleSheetChange}
      snapPoints={['40%']}
    >
      <BottomSheetFlatList
        data={frequencies}
        renderItem={renderFrequencyItem}
        keyExtractor={(item: FrequencyItem) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </BaseBottomSheet>
  );
};

export default FrequencyBottomSheet;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: getScaledSize(16),
  },
  frequencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getScaledSize(16),
    paddingVertical: getScaledSize(12),
    minHeight: getScaledSize(52),
  },
  frequencyName: {
    flex: 1,
    fontSize: getScaledSize(17),
    fontWeight: '400',
    color: theme.colors.text.primary,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border,
    marginLeft: getScaledSize(16),
  },
});

