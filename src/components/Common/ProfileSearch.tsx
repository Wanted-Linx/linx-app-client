import React from 'react';
import type { FC } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { responsiveWidth as rw, responsiveHeight as rh } from '../../style/dimensions';
import globalStyles from '../../style/styles';
import colors from '../../style/colors';
import { TouchableView } from './TouchableView';

export interface ProfileSearchData {
  id: number;
  name: string;
  image: string;
  description: string;
  business_type?: string;
  organization?: string;
}

export interface ProfileSearchProps {
  profile: ProfileSearchData;
  onPress: (profileId: number) => void;
}

export const ProfileSearch: FC<ProfileSearchProps> = ({ profile, onPress }) => {
  return (
    <TouchableView style={styles.container} viewStyle={styles.viewStyle} onPress={() => onPress(profile.id)}>
      <Image
        source={{
          uri:
            profile.image ??
            'https://media-exp1.licdn.com/dms/image/C560BAQGQWpaAuJLC8A/company-logo_200_200/0/1626253203412?e=2159024400&v=beta&t=b7c6YH1wVtA0gU8sjBc3_qSioe1AVqTgyxulWBtdf0g',
        }}
        style={styles.profile}
      />
      <View style={styles.textContainer}>
        <Text style={globalStyles.textBody15M}>{profile.name}</Text>
        <Text style={[globalStyles.textBody14, styles.textCategory]}>
          {profile.business_type ?? profile.organization}
        </Text>
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
    borderWidth: 0.7,
    borderColor: colors.colorGray100,
    marginRight: rw(18),
  },
  textContainer: { flex: 1 },
  textCategory: { color: colors.colorGray300, marginTop: rh(4) },
  textDescription: { color: colors.colorGray300, marginTop: rh(10) },
});
