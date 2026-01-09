import React, { useCallback, useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import BaseBottomSheet from './BaseBottomSheet';
import { theme } from '../theme';
import { getScaledSize, iconConfigs } from '../utils/constants';
import CheckmarkIcon from './CheckmarkIcon';
import Icon from '../assets/svg/Icon';

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

interface Props {
  bottomSheetRef: React.RefObject<any>;
  value: string;
  onConfirm: (categoryName: string) => void;
  categories: CategoryItem[];
}

const CategoryBottomSheet = ({
  bottomSheetRef,
  value,
  onConfirm,
  categories,
}: Props) => {
  const [tempSelectedCategory, setTempSelectedCategory] = useState<string | null>(null);

  const selectedCategory = tempSelectedCategory !== null ? tempSelectedCategory : value;

  const handleDone = useCallback(() => {
    onConfirm(selectedCategory);
    setTempSelectedCategory(null);
  }, [selectedCategory, onConfirm]);

  const handleDismiss = useCallback(() => {
    setTempSelectedCategory(null);
  }, []);

  const handleSheetChange = useCallback((index: number) => {
    if (index >= 0) {
      setTempSelectedCategory(null);
    }
  }, []);

  const handleSelectCategory = useCallback((categoryName: string) => {
    setTempSelectedCategory(categoryName);
  }, []);

  const iconConfigMap = useMemo(() => {
    return new Map(iconConfigs.map(config => [config.name, config]));
  }, []);

  const renderCategoryItem = useCallback(
    ({ item, index }: { item: CategoryItem; index: number }) => {
      const isSelected = item.name === selectedCategory;
      const isLastItem = index === categories.length - 1;
      const iconConfig = iconConfigMap.get(item.icon);
      
      return (
        <View>
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => handleSelectCategory(item.name)}
            activeOpacity={0.7}
          >
            <View style={styles.categoryIcon}>
              <Icon
                name={item.icon}
                width={iconConfig ? getScaledSize(iconConfig.defaultWidth) : undefined}
                height={iconConfig ? getScaledSize(iconConfig.defaultHeight) : undefined}
                color={theme.colors.text.primary}
              />
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
            {isSelected && <CheckmarkIcon />}
          </TouchableOpacity>
          {!isLastItem && <View style={styles.separator} />}
        </View>
      );
    },
    [selectedCategory, handleSelectCategory, categories.length, iconConfigMap]
  );

  return (
    <BaseBottomSheet
      bottomSheetRef={bottomSheetRef}
      title="Category"
      onDone={handleDone}
      onDismiss={handleDismiss}
      onChange={handleSheetChange}
      snapPoints={['40%']}
    >
      <BottomSheetFlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item: CategoryItem) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </BaseBottomSheet>
  );
};

export default CategoryBottomSheet;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: getScaledSize(16),
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getScaledSize(16),
    paddingVertical: getScaledSize(12),
    minHeight: getScaledSize(52),
  },
  categoryIcon: {
    marginRight: getScaledSize(12),
    width: getScaledSize(32),
    height: getScaledSize(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getScaledSize(16),
    backgroundColor: theme.colors.valueBackground,
  },
  categoryName: {
    flex: 1,
    fontSize: getScaledSize(17),
    fontWeight: '400',
    color: theme.colors.text.primary,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border,
    marginLeft: getScaledSize(60),
  },
});

