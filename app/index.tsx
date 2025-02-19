import { View, ActivityIndicator, TextInput } from "react-native";
import Card from "@/components/Card/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "expo-router";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { fetchPokemonDetails } from "@/redux/pokemonSlice";
import { AppDispatch } from "@/redux/store";

export default function Index() {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const onPressPokemon = async (name: string) => {
    dispatch(fetchPokemonDetails(name));
    router.push(`/details`);
  };

  const renderPokemons = (pokemons: any) => {
    return pokemons.map((item, index) => (
      <Card
        imageUrl={item.imageUrl}
        name={item.name}
        type={item.type}
        onPress={() => onPressPokemon(item.name)}
      />
    ));
  };

  const fetchPokemonData = async (url) => {
    try {
      const response = await axios.get(url);
      const types = response.data.types
        .map((type) => type.type.name)
        .join(", ");
      const imageUrl = response.data.sprites.front_default;

      return {
        name: response.data.name,
        type: types,
        imageUrl: imageUrl,
      };
    } catch (error) {
      console.error("Error fetching Pokémon details: ", error);
      return null;
    }
  };

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=4"
      );
      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          return await fetchPokemonData(pokemon.url);
        })
      );
      setPokemons(pokemonData);
      console.log("Pokemons: ", pokemons);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredPokemons(pokemons);
    } else {
      const filtered = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPokemons(filtered);
    }
  };

  useEffect(() => {
    fetchPokemon();
    navigation.setOptions({
      headerTitle: "Inicio",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="BuscarPokémon"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        renderPokemons(filteredPokemons)
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  searchInput: {
    width: "100%",
    backgroundColor: "white",
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});
