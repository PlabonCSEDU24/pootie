import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, FlatList, Animated } from "react-native";
import CarouselItem from "./CarouselItem";

const { width, heigth } = Dimensions.get("window");

const Carousel = ({ data }) => {
  const flatList = useRef(null);
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const [dataList, setDataList] = useState(data);

  useEffect(() => {
    setDataList(data);
  }, [data]);

  if (data && data.length) {
    return (
      <View>
        <FlatList
          data={data}
          ref={flatList}
          keyExtractor={(item, index) => "key" + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <CarouselItem item={item} />;
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />

        <View style={styles.dotView}>
          {data.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 6,
                  width: 6,
                  backgroundColor: "#595959",
                  marginHorizontal: 8,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  console.log("Please provide Images");
  return null;
};

const styles = StyleSheet.create({
  dotView: { flexDirection: "row", justifyContent: "center" },
});

export default Carousel;
