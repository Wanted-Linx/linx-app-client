import React from 'react';
import type { FC } from 'react';
import { View, Text, Image, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './SearchMain.style';
import { SearchInput, TouchableView } from '../../Common';
import globalStyles from '../../../style/styles';

interface SearchMainPresenterProps {
  shows: ShowInfo[];
  onPressSearchInput: () => void;
  onPressCategory: (category: string) => void;
  onPressShow: (showId: number) => void;
}

const categories = ['라이센스', '내한', '창작', '대극장', '소극장', '대학로'];

const SearchMainPresenter: FC<SearchMainPresenterProps> = ({ shows, onPressSearchInput, onPressCategory, onPressShow }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <SearchInput onPressIn={onPressSearchInput} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        bounces={false}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}>
        <Text style={[globalStyles.textCaption, styles.categoryTitle]}>카테고리</Text>
        <View style={styles.categoryContainer}>
          {categories.map((category, index) => (
            <TouchableView key={index} style={styles.categoryView} viewStyle={styles.categoryViewStyle} onPress={() => onPressCategory(category)}>
              <Image source={categoryImages[index]} style={styles.categoryImage} />
              <Text style={[globalStyles.textBody15, styles.categoryText]}>{category}</Text>
            </TouchableView>
          ))}
        </View>
        <View style={styles.rankContainer}>
          <Text style={[globalStyles.textHeadline29, styles.rankTitle]}>주별 랭킹</Text>
          <FlatList
            horizontal
            data={shows}
            renderItem={({ item }) => <Show show={item} onPress={() => onPressShow(item.id)} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.showsContainer}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchMainPresenter;
