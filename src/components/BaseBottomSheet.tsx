import React, { useCallback, useMemo, ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { theme } from '../theme';
import { getScaledSize } from '../utils/constants';

interface Props {
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
  title: string;
  children: ReactNode;
  onDone: () => void;
  snapPoints?: string[];
  onDismiss?: () => void;
  onChange?: (index: number) => void;
}

const BaseBottomSheet = ({
  bottomSheetRef,
  title,
  children,
  onDone,
  snapPoints = ['50%'],
  onDismiss,
  onChange,
}: Props) => {
  const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

  const handleDone = useCallback(() => {
    onDone();
    bottomSheetRef.current?.dismiss();
  }, [onDone, bottomSheetRef]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={memoizedSnapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      onDismiss={onDismiss}
      onChange={onChange}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.background}
      enableDynamicSizing={false}
      enableHandlePanningGesture={false}
      enableOverDrag={false}
    >

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={handleDone}
            activeOpacity={0.7}
          >
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </BottomSheetModal>
  );
};

export default BaseBottomSheet;

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.whiteBackground,
    borderTopLeftRadius: getScaledSize(16),
    borderTopRightRadius: getScaledSize(16),
  },
  handleIndicator: {
    backgroundColor: theme.colors.divider,
    width: getScaledSize(36),
    height: getScaledSize(5),
    marginTop: getScaledSize(8),
  },
  container: {
    flex: 1,
    paddingBottom: getScaledSize(16),
  },
  header: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: getScaledSize(16),
    paddingTop: getScaledSize(8),
    paddingBottom: getScaledSize(8),
  },
  title: {
    fontSize: getScaledSize(18),
    lineHeight: getScaledSize(26),
    fontWeight: '500',
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  doneButton: {
    position: 'absolute',
    right: getScaledSize(16),
    top: getScaledSize(8),
    paddingHorizontal: getScaledSize(8),
    minWidth: getScaledSize(60),
    alignItems: 'flex-end',
  },
  doneText: {
    fontSize: getScaledSize(18),
    lineHeight: getScaledSize(26),
    fontWeight: '500',
    color: theme.colors.text.secondary,
  },
});

