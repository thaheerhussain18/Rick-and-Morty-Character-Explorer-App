// screens/CharacterDetailScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CharacterDetailScreen = ({ route }) => {
  const { character } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={{ uri: character.image }} style={styles.image} />
        <Text style={styles.name}>{character.name}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text style={styles.detailValue}>{character.status}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Species:</Text>
          <Text style={styles.detailValue}>{character.species}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Gender:</Text>
          <Text style={styles.detailValue}>{character.gender}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Origin:</Text>
          <Text style={styles.detailValue}>{character.origin.name}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Episodes:</Text>
          <Text style={styles.detailValue}>{character.episode.length}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  detailValue: {
    flex: 1,
    textAlign: 'right',
  },
});

export default CharacterDetailScreen;