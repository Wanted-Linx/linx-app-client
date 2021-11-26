import React from 'react';
import type { FC } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { responsiveWidth as rw, responsiveHeight as rh } from '../../style/dimensions';
import globalStyles from '../../style/styles';
import colors from '../../style/colors';
import { TouchableView } from './TouchableView';

export interface ProfileSearchData {
  profileId: number;
  name: string;
  image: string;
  description: string;
  category?: string;
  university?: string;
}

export interface ProfileSearchProps {
  profile: ProfileSearchData;
  onPress: (profileId: number) => void;
}

export const ProfileSearch: FC<ProfileSearchProps> = ({ profile, onPress }) => {
  return (
    <TouchableView style={styles.container} viewStyle={styles.viewStyle} onPress={() => onPress(profile.profileId)}>
      <Image source={{ uri: profile.image }} style={styles.profile} />
      <View style={styles.textContainer}>
        <Text style={globalStyles.textBody15M}>{profile.name}</Text>
        <Text style={[globalStyles.textBody14, styles.textCategory]}>{profile.category ?? profile.university}</Text>
        <Text style={[globalStyles.textBody15R, styles.textDescription]} numberOfLines={1}>
          {profile.description}
        </Text>
      </View>
    </TouchableView>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: rh(24), width: '100%' },
  viewStyle: {
    flexDirection: 'row',
    paddingBottom: rh(24),
    borderBottomWidth: 1,
    borderColor: `${colors.colorGray500}1A`,
  },
  profile: {
    width: rw(72),
    height: rw(72),
    borderRadius: rw(4),
    borderWidth: 1,
    borderColor: colors.colorGray100,
    marginRight: rw(18),
  },
  textContainer: { flex: 1 },
  textCategory: { color: colors.colorGray300, marginTop: rh(4) },
  textDescription: { color: colors.colorGray300, marginTop: rh(10) },
});
