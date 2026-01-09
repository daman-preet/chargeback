import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

import BaseBottomSheet from './BaseBottomSheet';
import { theme } from '../theme';
import { getScaledSize } from '../utils/constants';
import Icon from '../assets/svg/Icon';

interface Props {
  bottomSheetRef: React.RefObject<any>;
  value: string;
  onConfirm: (amount: string) => void;
}

const cleanAmountValue = (val: string): string => val.replace('$', '').trim();

const formatAmount = (amount: string): string => {
  return amount === '' || amount === '0' ? '$0.00' : `$${amount}`;
};

const AmountBottomSheet = ({
  bottomSheetRef,
  value,
  onConfirm,
}: Props) => {
  const [tempAmount, setTempAmount] = useState<string | null>(null);

  const amount = tempAmount !== null ? tempAmount : cleanAmountValue(value);

  const handleDone = useCallback(() => {
    onConfirm(formatAmount(amount));
    setTempAmount(null);
  }, [amount, onConfirm]);

  const handleDismiss = useCallback(() => {
    setTempAmount(null);
  }, []);

  const handleSheetChange = useCallback((index: number) => {
    if (index >= 0) {
      setTempAmount(null);
    }
  }, []);

  const handleAmountChange = useCallback((text: string) => {
    setTempAmount(text.replace(/[^0-9.]/g, ''));
  }, []);

  return (
    <BaseBottomSheet
      bottomSheetRef={bottomSheetRef}
      title="Amount"
      onDone={handleDone}
      onDismiss={handleDismiss}
      onChange={handleSheetChange}
      snapPoints={['40%']}
    >
      <View style={styles.content}>
        <View style={styles.inputWrapper}>
          <Icon
            name="dollar"
            width={getScaledSize(10)}
            height={getScaledSize(17)}
            color={theme.colors.text.tertiary}
          />
          <BottomSheetTextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={handleAmountChange}
            placeholder="0"
            placeholderTextColor={theme.colors.text.tertiary}
            keyboardType="decimal-pad"
            autoFocus
          />
        </View>
      </View>
    </BaseBottomSheet>
  );
};

export default AmountBottomSheet;

const styles = StyleSheet.create({
  content: {
    paddingTop: getScaledSize(20),
    paddingHorizontal: getScaledSize(16),
    justifyContent: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: getScaledSize(20),
    backgroundColor: theme.colors.whiteBackground,
    paddingHorizontal: getScaledSize(16),
    paddingVertical: getScaledSize(8),
    gap: getScaledSize(8),
  },
  amountInput: {
    flex: 1,
    fontSize: getScaledSize(16),
    lineHeight: getScaledSize(20),
    fontWeight: '400',
    color: theme.colors.text.primary,
    padding: 0,
  },
});

