import React from 'react';
import type { FC } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './ShowList.style';
import globalStyles from '../../../style/styles';

interface ShowListPresenterProps {
  rankShows: ShowInfo[];
  shows: ShowInfo[];
  onPressShow: (showId: number) => void;
}

const ShowListPresenter: FC<ShowListPresenterProps> = ({ rankShows, shows, onPressShow }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never" bounces={false}>
        {rankShows.length ? (
          <View>
            <Text style={[globalStyles.textBody18, styles.rankTitle]}>요즘은 이 작품이 인기</Text>
            <FlatList
              horizontal
              data={rankShows}
              renderItem={({ item }) => <Show show={item} width={90} onPress={() => onPressShow(item.id)} />}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.rankContainer}
              showsHorizontalScrollIndicator={false}
            />
            <View style={styles.line} />
          </View>
        ) : null}
        <View style={styles.showsContaniner}>
          {shows.map((show) => (
            <Show key={show.id} show={show} width={150} onPress={() => onPressShow(show.id)} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShowListPresenter;
