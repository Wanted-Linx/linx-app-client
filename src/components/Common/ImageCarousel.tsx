import React, { useCallback, useState } from 'react';
import type { FC } from 'react';
import { StyleSheet, Image, View, TouchableWithoutFeedback } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { responsiveWidth as rw, responsiveHeight as rh } from '../../style/dimensions';
import colors from '../../style/colors';
import { BannerImage } from '../../assets/images';

export interface ImageData {
  imageUrl: string;
  url: string;
}

export interface ImageCarouselProps {
  data: ImageData[];
  onPress: (url: string) => void;
}

export const ImageCarousel: FC<ImageCarouselProps> = ({ data, onPress }) => {
  const [index, setIndex] = useState(0);
  const renderItem = useCallback(({ item, index }) => {
    return (
      <TouchableWithoutFeedback style={styles.image} onPress={() => onPress(item.url)}>
        <Image key={index} source={BannerImage} style={styles.image} resizeMode="cover" />
      </TouchableWithoutFeedback>
    );
  }, []);
  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={rw(375)}
        sliderHeight={rw(214)}
        itemWidth={rw(375)}
        itemHeight={rw(214)}
        activeSlideAlignment="start"
        onSnapToItem={(index) => setIndex(index)}
        activeSlideOffset={0}
        inactiveSlideScale={1}
        loop={true}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        containerStyle={styles.pagination}
        dotStyle={[styles.paginationDot, { width: rw(335) / data.length }]}
        dotColor={colors.colorGray500}
        inactiveDotColor={`${colors.colorGray000}4D`}
        inactiveDotScale={1}
        inactiveDotOpacity={1}
        animatedFriction={10}
        animatedTension={100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', height: rw(214) },
  image: { width: rw(375), height: rw(214) },
  pagination: { position: 'absolute', bottom: rw(16), paddingVertical: -20 },
  paginationDot: { height: rh(3), marginHorizontal: -8 },
});
