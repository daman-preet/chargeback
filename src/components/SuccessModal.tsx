import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';

import { theme } from '../theme';
import { getScaledSize } from '../utils/constants';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
  type?: 'success' | 'delete';
}

const SuccessModal = ({
  visible,
  onClose,
  message,
  title,
  type = 'success',
}: SuccessModalProps) => {
  const defaultTitle = type === 'delete' ? 'Deleted' : 'Success';
  const defaultMessage = type === 'delete' 
    ? 'Subscription deleted successfully!' 
    : 'Subscription saved successfully!';
  
  const iconColor = type === 'delete' ? theme.colors.danger : theme.colors.success;
  const displayTitle = title || defaultTitle;
  const displayMessage = message || defaultMessage;

  return (
    <Modal
      visible={visible}
      statusBarTranslucent={true}
      hardwareAccelerated={true}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <View style={[styles.checkmarkCircle, { backgroundColor: iconColor }]}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          </View>
          <Text style={styles.title}>{displayTitle}</Text>
          <Text style={styles.message}>{displayMessage}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getScaledSize(20),
  },
  modalContainer: {
    backgroundColor: theme.colors.whiteBackground,
    borderRadius: getScaledSize(16),
    paddingVertical: getScaledSize(32),
    paddingHorizontal: getScaledSize(24),
    width: '100%',
    maxWidth: getScaledSize(320),
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: getScaledSize(20),
  },
  checkmarkCircle: {
    width: getScaledSize(64),
    height: getScaledSize(64),
    borderRadius: getScaledSize(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: getScaledSize(36),
    color: theme.colors.whiteBackground,
    fontWeight: '600',
  },
  title: {
    fontSize: getScaledSize(20),
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: getScaledSize(12),
  },
  message: {
    fontSize: getScaledSize(16),
    fontWeight: '400',
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    marginBottom: getScaledSize(24),
    lineHeight: getScaledSize(22),
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: getScaledSize(12),
    paddingHorizontal: getScaledSize(32),
    borderRadius: getScaledSize(8),
    minWidth: getScaledSize(120),
    alignItems: 'center',
  },
  buttonText: {
    fontSize: getScaledSize(16),
    fontWeight: '600',
    color: theme.colors.whiteBackground,
  },
});

export default SuccessModal;

