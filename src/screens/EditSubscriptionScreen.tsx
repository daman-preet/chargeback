import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

import { theme } from '../theme';
import { getScaledSize, formatDate, APPS, CATEGORIES, FREQUENCIES, REMIND_ME } from '../utils/constants';
import Header from '../components/Header';
import SubscriptionCard from '../components/SubscriptionCard';
import FormRow from '../components/FormRow';
import ToggleRow from '../components/ToggleRow';
import DeleteButton from '../components/DeleteButton';
import DateBottomSheet from '../components/DateBottomSheet';
import AppBottomSheet from '../components/AppBottomSheet';
import AmountBottomSheet from '../components/AmountBottomSheet';
import CategoryBottomSheet from '../components/CategoryBottomSheet';
import FrequencyBottomSheet from '../components/FrequencyBottomSheet';
import RemindMeBottomSheet from '../components/RemindMeBottomSheet';
import SuccessModal from '../components/SuccessModal';
import { useEditSubscription } from './useEditSubscription';

const EditSubscriptionScreen = () => {
  const {
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
  } = useEditSubscription();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={theme.colors.background}
      />
      <Header
        onBack={handleBack}
        onSave={handleSave}
        title={"Edit Subscription"}
        saveDisabled={!app || isSaved || amount === '$0.00'}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SubscriptionCard
          appName={app || 'Choose an app'}
          amount={amount}
          selectedApp={selectedApp}
        />

        <View style={styles.formCard}>
          <FormRow
            label={"App"}
            value={app || 'Choose an app'}
            onPress={openAppPicker}
            hasDropdown
            valueColor={!app ? theme.colors.text.neutral : undefined}
          />
          <View style={styles.divider} />

          <FormRow
            label={"Amount"}
            value={amount}
            onPress={openAmountPicker}
          />
          <View style={styles.divider} />

          <FormRow
            label={"Category"}
            value={category}
            onPress={openCategoryPicker}
            hasDropdown
            icon={"💰"}
          />
        </View>
        <View style={styles.formCard}>
          <FormRow
            label="Start Date"
            value={formatDate(startDate)}
            onPress={openDatePicker}
            valueBackgroundColor={theme.colors.valueBackground}
          />
          <View style={styles.divider} />
          <FormRow
            label={"Frequency"}
            value={frequency}
            onPress={openFrequencyPicker}
            hasDropdown
          />
          <View style={styles.divider} />

          <FormRow
            label={"Remind Me"}
            value={remindMe}
            onPress={openRemindMePicker}
            hasDropdown
          />
          <View style={styles.divider} />

          <ToggleRow
            label={"Active"}
            value={isActive}
            onValueChange={setIsActive}
          />
        </View>

        <DeleteButton onPress={handleDelete} />
      </ScrollView>
      {Platform.OS === 'ios' && (
        <DateBottomSheet
          bottomSheetRef={dateSheetRef}
          value={startDate}
          onConfirm={handleConfirmDate}
        />
      )}
      {Platform.OS === 'android' && showAndroidDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleAndroidDateChange}
        />
      )}
      <AppBottomSheet
        bottomSheetRef={appSheetRef}
        value={app}
        onConfirm={handleConfirmApp}
        apps={APPS}
      />
      <AmountBottomSheet
        bottomSheetRef={amountSheetRef}
        value={amount}
        onConfirm={handleConfirmAmount}
      />
      <CategoryBottomSheet
        bottomSheetRef={categorySheetRef}
        value={category}
        onConfirm={handleConfirmCategory}
        categories={CATEGORIES}
      />
      <FrequencyBottomSheet
        bottomSheetRef={frequencySheetRef}
        value={frequency}
        onConfirm={handleConfirmFrequency}
        frequencies={FREQUENCIES}
      />
      <RemindMeBottomSheet
        bottomSheetRef={remindMeSheetRef}
        value={remindMe}
        onConfirm={handleConfirmRemindMe}
        remindMeOptions={REMIND_ME}
      />
      <SuccessModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message="Subscription saved successfully!"
        type="success"
      />
      <SuccessModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        message="Subscription deleted successfully!"
        type="delete"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: getScaledSize(16),
    paddingBottom: getScaledSize(32),
  },
  formCard: {
    backgroundColor: theme.colors.whiteBackground,
    borderRadius: getScaledSize(12),
    overflow: 'hidden',
    marginTop: getScaledSize(20),
    borderWidth: 1,
    borderColor: theme.colors.softBorder,
    gap: getScaledSize(12),
    paddingVertical: getScaledSize(12),
    paddingHorizontal: getScaledSize(18),
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
  },
});

export default EditSubscriptionScreen;