import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Details = () => {
  const pokemonDetails = useSelector(
    (state: RootState) => state.pokemon.details
  );
  const loading = useSelector((state: RootState) => state.pokemon.loading);
  const error = useSelector((state: RootState) => state.pokemon.error);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!pokemonDetails) {
    return (
      <View style={styles.center}>
        <Text>No Pokémon details available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: pokemonDetails.sprites?.front_default }}
          style={styles.pokemonImage}
        />
        <Text style={styles.pokemonName}>{pokemonDetails.name}</Text>

        <Text style={styles.pokemonType}>
          Types:{" "}
          {pokemonDetails.types?.map((type) => type.type.name).join(", ")}
        </Text>
        <View style={styles.detailsRow}>
          <Text style={styles.pokemonHeight}>
            Height: {pokemonDetails.height}
          </Text>
          <Text style={styles.pokemonWeight}>
            Weight: {pokemonDetails.weight}
          </Text>
        </View>
        <Text style={styles.pokemonAbilities}>
          Abilities:{" "}
          {pokemonDetails.abilities
            ?.map((ability) => ability.ability.name)
            .join(", ")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginBottom: 12,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  pokemonType: {
    fontSize: 18,
    color: "#555",
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
  },
  pokemonHeight: {
    fontSize: 16,
    color: "#777",
  },
  pokemonWeight: {
    fontSize: 16,
    color: "#777",
  },
  pokemonAbilities: {
    fontSize: 16,
    color: "#777",
    marginTop: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});

export default Details;
