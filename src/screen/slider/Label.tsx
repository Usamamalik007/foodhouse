import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

const Label = ({ text , ...restProps }:any) => (
  <View style={styles.root} {...restProps}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 5,
    backgroundColor: "#FE6600",
    borderRadius: 5
  },
  text: {
    fontSize: 12,
    color: "#fff"
  }
});

export default memo(Label);