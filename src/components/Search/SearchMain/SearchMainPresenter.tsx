import React from 'react';
import type { FC } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './SearchMain.style';
import { ProfileSearch, TouchableView } from '../../Common';
import globalStyles from '../../../style/styles';
import colors from '../../../style/colors';
import type { ProfileSearchData } from '../../Common';

interface SearchMainPresenterProps {
  isClubOn: boolean;
  clubList: ProfileSearchData[];
  companyList: ProfileSearchData[];
  onPressTopTab: (isClubOn: boolean) => void;
  onPressProfile: (profileId: number) => void;
}

const SearchMainPresenter: FC<SearchMainPresenterProps> = ({
  isClubOn,
  clubList,
  companyList,
  onPressTopTab,
  onPressProfile,
}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topTab} edges={['top']}>
        <TouchableView style={styles.tab} onPress={() => onPressTopTab(true)}>
          <Text style={[globalStyles.textBody15M, { color: isClubOn ? colors.colorPrimary500 : colors.colorGray300 }]}>
            동아리
          </Text>
        </TouchableView>
        <View style={styles.line} />
        <TouchableView style={styles.tab} onPress={() => onPressTopTab(false)}>
          <Text style={[globalStyles.textBody15M, { color: !isClubOn ? colors.colorPrimary500 : colors.colorGray300 }]}>
            기업
          </Text>
        </TouchableView>
      </SafeAreaView>
      <FlatList
        data={isClubOn ? clubList : companyList}
        renderItem={({ item }) => <ProfileSearch profile={item} onPress={onPressProfile} />}
        extraData={isClubOn}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.profileContainer}
      />
    </View>
  );
};

export default SearchMainPresenter;
