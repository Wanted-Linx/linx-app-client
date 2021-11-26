import React from 'react';
import type { FC, ComponentProps } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { responsiveWidth as rw, responsiveHeight as rh } from '../../style/dimensions';
import globalStyles from '../../style/styles';
import colors from '../../style/colors';
import { Button, TouchableView } from '../Common';
import { CloseIcon } from '../../assets/images';

export type BottomModalProps = ComponentProps<typeof Modal> & {
  title: string;
  subtitle?: string;
  buttonTexts: string[];
  onPressClose: () => void;
  onPresses: (() => void)[];
};

export const BottomModal: FC<BottomModalProps> = ({
  title,
  subtitle,
  buttonTexts,
  onPressClose,
  onPresses,
  ...modalProps
}) => {
  return (
    <Modal animationType="fade" transparent={true} {...modalProps}>
      <View style={styles.background}>
        <SafeAreaView style={styles.view}>
          <TouchableView style={styles.close} onPress={onPressClose}>
            <CloseIcon />
          </TouchableView>
          <Text style={[globalStyles.textHeadline18M]}>{title}</Text>
          <Text style={[globalStyles.textBody15R, styles.textSubtitle]}>{subtitle}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title={buttonTexts[0]}
              style={styles.buttonFirst}
              textStyle={styles.textButtonFirst}
              onPress={onPresses[0]}
            />
            <Button title={buttonTexts[1]} style={styles.buttonSecond} onPress={onPresses[1]} />
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: `${colors.colorGray500}99` },
  view: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    borderTopLeftRadius: rw(12),
    borderTopRightRadius: rw(12),
    backgroundColor: colors.colorGray000,
    paddingTop: rw(20),
  },
  close: { alignSelf: 'flex-end', marginRight: rw(20), marginBottom: rh(10) },
  textSubtitle: { textAlign: 'center', marginTop: rh(24), marginBottom: rh(40) },
  buttonContainer: { width: '100%', flexDirection: 'row' },
  buttonFirst: { flex: 1, height: rh(60), borderWidth: 0.7, borderColor: colors.colorGray500 },
  buttonSecond: { flex: 1, height: rh(60), backgroundColor: colors.colorGray500 },
  textButtonFirst: { color: colors.colorGray500 },
});
