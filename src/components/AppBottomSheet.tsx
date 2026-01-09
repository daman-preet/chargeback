import React, { useCallback, useMemo, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { BottomSheetFlatList, BottomSheetTextInput } from '@gorhom/bottom-sheet';

import BaseBottomSheet from './BaseBottomSheet';
import { theme } from '../theme';
import { getScaledSize, AppItem } from '../utils/constants';
import Icon from '../assets/svg/Icon';
import CheckmarkIcon from './CheckmarkIcon';
import Netflix from '../assets/svg/Netflix';

const APP_ICON_SIZE = getScaledSize(24);
const SEARCH_ICON_SIZE = getScaledSize(17);

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

interface Props {
  bottomSheetRef: React.RefObject<any>;
  value: string;
  onConfirm: (appName: string) => void;
  apps: AppItem[];
}

const AppBottomSheet = ({
  bottomSheetRef,
  value,
  onConfirm,
  apps,
}: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tempSelectedApp, setTempSelectedApp] = useState<string | null>(null);

  const selectedApp = tempSelectedApp !== null ? tempSelectedApp : value;

  const handleDone = useCallback(() => {
    onConfirm(selectedApp);
    setTempSelectedApp(null);
  }, [selectedApp, onConfirm]);

  const handleDismiss = useCallback(() => {
    setTempSelectedApp(null);
    setSearchQuery('');
  }, []);

  const handleSheetChange = useCallback((index: number) => {
    if (index >= 0) {
      setTempSelectedApp(null);
      setSearchQuery('');
    }
  }, []);

  const handleSelectApp = useCallback((appName: string) => {
    setTempSelectedApp(appName);
  }, []);

  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return apps;
    const query = searchQuery.toLowerCase();
    return apps.filter(app => app.name.toLowerCase().includes(query));
  }, [apps, searchQuery]);

  const renderAppIcon = useCallback((item: AppItem) => {
    if (!item.iconPath) return null;

    if (item.iconType === 'svg' && appSvgs[item.iconPath]) {
      const SvgComponent = appSvgs[item.iconPath];
      return (
        <View style={[styles.appIcon, styles.svgIcon]}>
          <SvgComponent width={APP_ICON_SIZE} height={APP_ICON_SIZE} />
        </View>
      );
    }

    if (appImages[item.iconPath]) {
      return (
        <View style={[styles.appIcon, styles.imageIcon]}>
          <Image
            source={appImages[item.iconPath]}
            style={styles.iconImage}
            resizeMode="cover"
          />
        </View>
      );
    }

    return null;
  }, []);

  const renderAppItem = useCallback(
    ({ item }: { item: AppItem }) => {
      const isSelected = item.name === selectedApp;
      return (
        <TouchableOpacity
          style={styles.appItem}
          onPress={() => handleSelectApp(item.name)}
          activeOpacity={0.7}
        >
          {renderAppIcon(item)}
          <Text style={styles.appName}>{item.name}</Text>
          {isSelected && <CheckmarkIcon />}
        </TouchableOpacity>
      );
    },
    [selectedApp, handleSelectApp, renderAppIcon]
  );

  const renderItemSeparator = () => <View style={styles.separator} />;

  const renderEmptyComponent = useCallback(() => {
    if (!searchQuery.trim()) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No apps found</Text>
        <Text style={styles.emptySubtext}>Try searching with a different term</Text>
      </View>
    );
  }, [searchQuery]);

  return (
    <BaseBottomSheet
      bottomSheetRef={bottomSheetRef}
      title="App"
      onDone={handleDone}
      onDismiss={handleDismiss}
      onChange={handleSheetChange}
      snapPoints={['60%']}
    >
      <View style={styles.searchContainer}>
        <Icon
          name="search"
          width={SEARCH_ICON_SIZE}
          height={SEARCH_ICON_SIZE}
          color={theme.colors.text.tertiary}
        />
        <BottomSheetTextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={theme.colors.text.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <BottomSheetFlatList
        data={filteredApps}
        renderItem={renderAppItem}
        keyExtractor={(item: AppItem) => item.id}
        ItemSeparatorComponent={renderItemSeparator}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={[styles.listContent, filteredApps.length === 0 && styles.emptyListContent]}
        showsVerticalScrollIndicator={false}
      />
    </BaseBottomSheet>
  );
};

export default AppBottomSheet;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.whiteBackground,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: getScaledSize(10),
    marginHorizontal: getScaledSize(16),
    marginTop: getScaledSize(20),
    paddingHorizontal: getScaledSize(16),
    height: getScaledSize(44),
    gap: getScaledSize(10),
  },
  searchInput: {
    flex: 1,
    fontSize: getScaledSize(16),
    lineHeight: getScaledSize(20),
    fontWeight: '400',
    color: theme.colors.text.primary,
    padding: 0,
  },
  listContent: {
    paddingBottom: getScaledSize(16),
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getScaledSize(16),
    paddingVertical: getScaledSize(12),
    minHeight: getScaledSize(52),
  },
  appIcon: {
    width: getScaledSize(40),
    height: getScaledSize(40),
    borderRadius: getScaledSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getScaledSize(12),
    overflow: 'hidden',
  },
  svgIcon: {
    backgroundColor: theme.colors.blackBackground,
  },
  imageIcon: {
    borderColor: theme.colors.divider,
    borderWidth: 1,
  },
  iconImage: {
    width: getScaledSize(40),
    height: getScaledSize(40),
  },
  appName: {
    flex: 1,
    fontSize: getScaledSize(17),
    fontWeight: '400',
    color: theme.colors.text.primary,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border,
    marginLeft: getScaledSize(68),
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: getScaledSize(48),
    paddingHorizontal: getScaledSize(32),
  },
  emptyText: {
    lineHeight: getScaledSize(20),
    fontSize: getScaledSize(16),
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: getScaledSize(8),
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: getScaledSize(14),
    fontWeight: '400',
    color: theme.colors.text.tertiary,
    textAlign: 'center',
  },
});

