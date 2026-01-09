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

export interface RemindMeItem {
  id: string;
  name: string;
}

interface Props {
  bottomSheetRef: React.RefObject<any>;
  value: string;
  onConfirm: (remindMeName: string) => void;
  remindMeOptions: RemindMeItem[];
}

const RemindMeBottomSheet = ({
  bottomSheetRef,
  value,
  onConfirm,
  remindMeOptions,
}: Props) => {
  const [tempSelectedRemindMe, setTempSelectedRemindMe] = useState<string | null>(null);

  const selectedRemindMe = tempSelectedRemindMe !== null ? tempSelectedRemindMe : value;

  const handleDone = useCallback(() => {
    onConfirm(selectedRemindMe);
    setTempSelectedRemindMe(null);
  }, [selectedRemindMe, onConfirm]);

  const handleDismiss = useCallback(() => {
    setTempSelectedRemindMe(null);
  }, []);

  const handleSheetChange = useCallback((index: number) => {
    if (index >= 0) {
      setTempSelectedRemindMe(null);
    }
  }, []);

  const handleSelectRemindMe = useCallback((remindMeName: string) => {
    setTempSelectedRemindMe(remindMeName);
  }, []);

  const renderRemindMeItem = useCallback(
    ({ item, index }: { item: RemindMeItem; index: number }) => {
      const isSelected = item.name === selectedRemindMe;
      const isLastItem = index === remindMeOptions.length - 1;
      
      return (
        <View>
          <TouchableOpacity
            style={styles.remindMeItem}
            onPress={() => handleSelectRemindMe(item.name)}
            activeOpacity={0.7}
          >
            <Text style={styles.remindMeName}>{item.name}</Text>
            {isSelected && <CheckmarkIcon />}
          </TouchableOpacity>
          {!isLastItem && (
            <View style={styles.separator} />
          )}
        </View>
      );
    },
    [selectedRemindMe, handleSelectRemindMe, remindMeOptions.length]
  );

  return (
    <BaseBottomSheet
      bottomSheetRef={bottomSheetRef}
      title="Remind Me"
      onDone={handleDone}
      onDismiss={handleDismiss}
      onChange={handleSheetChange}
      snapPoints={['40%']}
    >
      <BottomSheetFlatList
        data={remindMeOptions}
        renderItem={renderRemindMeItem}
        keyExtractor={(item: RemindMeItem) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </BaseBottomSheet>
  );
};

export default RemindMeBottomSheet;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: getScaledSize(16),
  },
  remindMeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getScaledSize(16),
    paddingVertical: getScaledSize(12),
    minHeight: getScaledSize(52),
  },
  remindMeName: {
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

