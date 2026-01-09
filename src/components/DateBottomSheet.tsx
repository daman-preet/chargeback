import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import BaseBottomSheet from './BaseBottomSheet';
import { getScaledSize } from '../utils/constants';

interface Props {
    bottomSheetRef: React.RefObject<any>;
    value: Date;
    onConfirm: (date: Date) => void;
}

const DateBottomSheet = ({
    bottomSheetRef,
    value,
    onConfirm,
}: Props) => {
    const [tempDate, setTempDate] = useState<Date | null>(null);

    const currentDate = tempDate !== null ? tempDate : value;

    const onChange = useCallback(
        (event: DateTimePickerEvent, selectedDate?: Date) => {
            if (Platform.OS === 'android') {
                if (event.type === 'set' && selectedDate) {
                    onConfirm(selectedDate);
                }
            } else if (selectedDate) {
                setTempDate(selectedDate);
            }
        },
        [onConfirm]
    );

    const handleDone = useCallback(() => {
        onConfirm(currentDate);
        setTempDate(null);
    }, [currentDate, onConfirm]);

    const handleDismiss = useCallback(() => {
        setTempDate(null);
    }, []);

    const handleSheetChange = useCallback((index: number) => {
        if (index >= 0) {
            setTempDate(null);
        }
    }, []);

    return (
        <BaseBottomSheet
            bottomSheetRef={bottomSheetRef}
            title="Start Date"
            onDone={handleDone}
            onDismiss={handleDismiss}
            onChange={handleSheetChange}
            snapPoints={['40%']}
        >
            <View style={styles.pickerContainer}>
                <DateTimePicker
                    value={Platform.OS === 'ios' ? currentDate : value}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange}
                    style={styles.picker}
                />
            </View>
        </BaseBottomSheet>
    );
};

export default DateBottomSheet;

const styles = StyleSheet.create({
    pickerContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: getScaledSize(8),
        paddingBottom: 0,
    },
    picker: {
        width: '100%',
        height: Platform.OS === 'ios' ? 216 : 'auto',
    },
});
