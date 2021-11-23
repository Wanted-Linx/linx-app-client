import React from 'react';
import type { FC } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './SearchShow.style';
import { SearchInput, TouchableView, Tag, Button } from '../../Common';
import globalStyles from '../../../style/styles';
import colors from '../../../style/colors';

interface SearchShowPresenterProps {
  inputValue: string;
  searchShows: { id: number; title: string }[];
  searchTerm: string;
  shows: ShowInfo[];
  tags: { name: string }[];
  onChangeText: (text: string) => void;
  onPressSearch: () => void;
  onPressClose: () => void;
  onPressTag: (tag: string) => void;
  onPressShow: (id: number, title: string) => void;
  onPressNoShow: () => void;
}

const SearchShowPresenter: FC<SearchShowPresenterProps> = ({
  inputValue,
  searchShows,
  searchTerm,
  shows,
  tags,
  onChangeText,
  onPressSearch,
  onPressClose,
  onPressTag,
  onPressShow,
  onPressNoShow,
}) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <SearchInput value={inputValue} onChangeText={onChangeText} onPressSearch={onPressSearch} onPressClose={onPressClose} />
      {searchTerm === '' ? (
        <View>
          <Text style={[globalStyles.textCaption, styles.searchTermTitle]}>최근 검색</Text>
          {searchShows.length ? (
            searchShows.map((searcShow, index) => (
              <TouchableView key={index} style={styles.searchTermTextView} onPress={() => onPressShow(searcShow.id, searcShow.title)}>
                <Text style={[globalStyles.textBody15, styles.searchTermText]}>{searcShow.title}</Text>
              </TouchableView>
            ))
          ) : (
            <Text style={[globalStyles.textBody15, styles.noSearchTermText]}>최근 검색어가 없습니다.</Text>
          )}
          <Text style={[globalStyles.textCaption, styles.tagTitle]}>추천 태그</Text>
          <View style={styles.line} />
          <View style={styles.tagContainer}>
            {tags.map((tag, index) => (
              <Tag key={index} text={tag.name} backgroundColor={colors.colorPrimary500} onPress={() => onPressTag(tag.name)} style={styles.tag} />
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.showContainer}>
          {shows.length > 0 ? (
            <FlatList
              data={shows}
              renderItem={({ item }) => <SearchedShow show={item} onPress={() => onPressShow(item.id, item.title)} />}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.noShowContainer}>
              <Text style={[globalStyles.textBody15, styles.noShowText]}>혹시 '{searchTerm}' 작품이 없나요?</Text>
              <Button title="Ogle에게 DM으로 알려주세요!" style={styles.noShowButton} onPress={onPressNoShow} />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchShowPresenter;
