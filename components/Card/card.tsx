import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const Card = ({ name, imageUrl, type, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name.toUpperCase()}</Text>
        <Text style={styles.type}>{type}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    width: "40%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  info: {
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  type: {
    fontSize: 14,
    color: "#555",
  },
});
