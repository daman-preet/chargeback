import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { theme } from '../theme';
import { getScaledSize, AppItem } from '../utils/constants';
import Netflix from '../assets/svg/Netflix';
import ChooseApp from '../assets/svg/ChooseApp';

const appImages: { [key: string]: any } = {
  'spotify.png': require('../assets/images/spotify.png'),
  'newYork.png': require('../assets/images/newYork.png'),
  'wallStreet.png': require('../assets/images/wallStreet.png'),
  'hulu.png': require('../assets/images/hulu.png'),
  'apple.png': require('../assets/images/apple.png'),
  'amazon.png': require('../assets/images/amazon.png'),
};

const appSvgs: { [key: string]: React.ComponentType<any> } = {
  'Netflix': Netflix,
};

interface SubscriptionCardProps {
  appName: string;
  amount: string;
  selectedApp?: AppItem;
}

const SubscriptionCard = ({
  appName,
  amount,
  selectedApp,
}: SubscriptionCardProps) => {
  const renderPlaceholderIcon = () => {
    const iconWidth = getScaledSize(32);
    const iconHeight = getScaledSize(32);
    return (
      <View style={[styles.appIcon, styles.placeholderIcon]}>
        <ChooseApp
          width={iconWidth}
          height={iconHeight}
          color={theme.colors.whiteBackground}
        />
      </View>
    );
  };

  const renderAppIcon = () => {
    if (!selectedApp) return renderPlaceholderIcon();
    const iconSize = getScaledSize(32);
    if (selectedApp.iconPath) {
      if (selectedApp.iconType === 'svg' && appSvgs[selectedApp.iconPath]) {
        const SvgComponent = appSvgs[selectedApp.iconPath];
        return (
          <View 
            key={selectedApp.id}
            style={[styles.appIcon, { backgroundColor: theme.colors.blackBackground }]}
          >
            <SvgComponent width={iconSize} height={iconSize} />
          </View>
        );
      }
      if (appImages[selectedApp.iconPath]) {
        return (
          <View 
            key={selectedApp.id}
            style={[
              styles.appIcon,
              {
                borderColor: theme.colors.divider,
                borderWidth: 1,
              }
            ]}
          >
            <Image
              key={selectedApp.id}
              source={appImages[selectedApp.iconPath]}
              style={styles.iconImage}
              resizeMode="cover"
            />
          </View>
        );
      }
    }

    return renderPlaceholderIcon();
  };

  const isAppSelected = !!selectedApp;

  return (
    <View style={styles.subscriptionCard}>
      {renderAppIcon()}
      <View style={styles.subscriptionInfo}>
        <Text style={[
          styles.appName,
          !isAppSelected && styles.appNameNeutral
        ]}>{appName}</Text>
        <Text style={styles.subscriptionAmount}>{amount}</Text>
      </View>
    </View>
  );
};

export default SubscriptionCard;

const styles = StyleSheet.create({
  subscriptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.whiteBackground,
    borderRadius: getScaledSize(12),
    padding: getScaledSize(20),
    marginTop: getScaledSize(20),
    borderWidth: 1,
    borderColor: theme.colors.softBorder,
  },
  appIcon: {
    width: getScaledSize(50),
    height: getScaledSize(50),
    borderRadius: getScaledSize(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getScaledSize(14),
    backgroundColor: theme.colors.blackBackground,
    overflow: 'hidden',
  },
  placeholderIcon: {
    backgroundColor: theme.colors.valueBackground,
  },
  iconImage: {
    width: getScaledSize(50),
    height: getScaledSize(50),
  },
  subscriptionInfo: {
    flex: 1,
  },
  appName: {
    fontSize: getScaledSize(18),
    lineHeight: getScaledSize(26),
    fontWeight: '500',
    color: theme.colors.text.primary,
  },
  appNameNeutral: {
    color: theme.colors.text.neutral,
  },
  subscriptionAmount: {
    fontSize: getScaledSize(16),
    lineHeight: getScaledSize(22),
    color: theme.colors.text.tertiary,
    fontWeight: '400',
    marginTop: getScaledSize(2),
  },
});