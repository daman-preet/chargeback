import { useCallback, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { APPS } from '../utils/constants';

const INITIAL_STATE = {
  isActive: true,
  app: '',
  amount: '$0.00',
  category: 'Loan',
  frequency: 'Weekly',
  remindMe: '2 days before',
};

const BOTTOM_SHEET_DELAY = 100;

const openBottomSheet = (ref: React.RefObject<BottomSheetModal | null>) => {
  if (ref.current) {
    setTimeout(() => {
      ref.current?.present();
    }, BOTTOM_SHEET_DELAY);
  }
};

export const useEditSubscription = () => {
  const [isActive, setIsActive] = useState(INITIAL_STATE.isActive);
  const [app, setApp] = useState(INITIAL_STATE.app);
  const [amount, setAmount] = useState(INITIAL_STATE.amount);
  const [category, setCategory] = useState(INITIAL_STATE.category);
  const [frequency, setFrequency] = useState(INITIAL_STATE.frequency);
  const [remindMe, setRemindMe] = useState(INITIAL_STATE.remindMe);
  const [startDate, setStartDate] = useState(new Date());
  const [showAndroidDatePicker, setShowAndroidDatePicker] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const dateSheetRef = useRef<BottomSheetModal>(null);
  const appSheetRef = useRef<BottomSheetModal>(null);
  const amountSheetRef = useRef<BottomSheetModal>(null);
  const categorySheetRef = useRef<BottomSheetModal>(null);
  const frequencySheetRef = useRef<BottomSheetModal>(null);
  const remindMeSheetRef = useRef<BottomSheetModal>(null);

  const openDatePicker = useCallback(() => {
    if (Platform.OS === 'android') {
      setShowAndroidDatePicker(true);
    } else {
      openBottomSheet(dateSheetRef);
    }
  }, []);

  const handleConfirmDate = useCallback((date: Date) => {
    setStartDate(date);
  }, []);

  const handleAndroidDateChange = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      setShowAndroidDatePicker(false);
      if (event.type === 'set' && selectedDate) {
        setStartDate(selectedDate);
      }
    },
    []
  );

  const openAppPicker = useCallback(() => {
    openBottomSheet(appSheetRef);
  }, []);

  const handleConfirmApp = useCallback((appName: string) => {
    setApp(appName);
  }, []);

  const openAmountPicker = useCallback(() => {
    openBottomSheet(amountSheetRef);
  }, []);

  const handleConfirmAmount = useCallback((amountValue: string) => {
    setAmount(amountValue);
  }, []);

  const openCategoryPicker = useCallback(() => {
    openBottomSheet(categorySheetRef);
  }, []);

  const handleConfirmCategory = useCallback((categoryName: string) => {
    setCategory(categoryName);
  }, []);

  const openFrequencyPicker = useCallback(() => {
    openBottomSheet(frequencySheetRef);
  }, []);

  const handleConfirmFrequency = useCallback((frequencyName: string) => {
    setFrequency(frequencyName);
  }, []);

  const openRemindMePicker = useCallback(() => {
    openBottomSheet(remindMeSheetRef);
  }, []);

  const handleConfirmRemindMe = useCallback((remindMeName: string) => {
    setRemindMe(remindMeName);
  }, []);

  const handleBack = useCallback(() => {
    // Navigation logic here
  }, []);

  const handleSave = useCallback(() => {
    setIsSaved(true);
    setShowSuccessModal(true);
  }, []);

  const handleDelete = useCallback(() => {
    if (isSaved && app) {
      setApp(INITIAL_STATE.app);
      setAmount(INITIAL_STATE.amount);
      setCategory(INITIAL_STATE.category);
      setFrequency(INITIAL_STATE.frequency);
      setRemindMe(INITIAL_STATE.remindMe);
      setStartDate(new Date());
      setIsActive(INITIAL_STATE.isActive);
      setIsSaved(false);
      setShowDeleteModal(true);
    }
  }, [isSaved, app]);

  const selectedApp = app ? APPS.find(a => a.name === app) : undefined;

  return {
    isActive,
    setIsActive,
    app,
    amount,
    category,
    frequency,
    remindMe,
    startDate,
    showAndroidDatePicker,
    showSuccessModal,
    setShowSuccessModal,
    showDeleteModal,
    setShowDeleteModal,
    dateSheetRef,
    appSheetRef,
    amountSheetRef,
    categorySheetRef,
    frequencySheetRef,
    remindMeSheetRef,
    openDatePicker,
    handleConfirmDate,
    handleAndroidDateChange,
    openAppPicker,
    handleConfirmApp,
    openAmountPicker,
    handleConfirmAmount,
    openCategoryPicker,
    handleConfirmCategory,
    openFrequencyPicker,
    handleConfirmFrequency,
    openRemindMePicker,
    handleConfirmRemindMe,
    handleBack,
    handleSave,
    handleDelete,
    selectedApp,
    isSaved,
  };
};

