import AsyncStorage from "@react-native-async-storage/async-storage";
export const deleteFromBookmark = async (id) => {
  try {
    let value = await AsyncStorage.getItem("@bookmarked");
    if (value !== null) {
      value = JSON.parse(value);
      console.log(value);
      const indx = value.findIndex((v) => v._id === id);
      value.splice(indx, indx >= 0 ? 1 : 0);
      await AsyncStorage.setItem("@bookmarked", JSON.stringify(value));
    }
  } catch (err) {
    console.log(err);
  }
};
