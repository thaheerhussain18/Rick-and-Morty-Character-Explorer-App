// screens/HomeScreen.js
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rick and Morty Character Explorer</Text>
      <View style={styles.cardContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('CharacterList', { filter: 'all' })}>
          <Text style={styles.buttonText}>All Characters</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('CharacterList', { filter: 'alive' })}>
          <Text style={styles.buttonText}>Alive Characters</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('CharacterList', { filter: 'dead' })}>
          <Text style={styles.buttonText}>Dead Characters</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  cardContainer: {
    width: '80%',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default HomeScreen;