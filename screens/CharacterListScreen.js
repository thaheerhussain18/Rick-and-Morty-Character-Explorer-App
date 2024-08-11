import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute

const CharacterListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the route object
  const { filter } = route.params; // Get the filter parameter from navigation
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        setCharacters(data.results);
        setFilteredCharacters(data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };
    fetchCharacters();
  }, []);

  useEffect(() => {
    // Apply the filter based on the selected filter parameter
    const applyFilter = () => {
      let filtered = characters;

      // Check the filter parameter from the route
      if (filter === 'alive') {
        filtered = characters.filter(character => character.status === 'Alive');
      } else if (filter === 'dead') {
        filtered = characters.filter(character => character.status === 'Dead');
      } else if (filter === 'all') {
        filtered = characters; // Show all characters
      }

      setFilteredCharacters(filtered);
    };

    applyFilter(); // Call the filter function
  }, [filter, characters]); // Run when filter or characters change

  const applyFilters = () => {
    let filtered = characters;

    if (selectedStatus) {
      filtered = filtered.filter(character => character.status === selectedStatus);
    }
    if (selectedSpecies) {
      filtered = filtered.filter(character => character.species === selectedSpecies);
    }
    if (selectedGender) {
      filtered = filtered.filter(character => character.gender === selectedGender);
    }

    setFilteredCharacters(filtered);
    setModalVisible(false); // Close the filter modal
  };

  const handleCharacterPress = (character) => {
    navigation.navigate('CharacterDetail', { character });
  };

  return (
    <View style={styles.container}>
      <Button title="Filter Characters" onPress={() => setModalVisible(true)} />
      
      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCharacterPress(item)}>
            <View style={styles.characterContainer}>
              <Image source={{ uri: item.image }} style={styles.characterImage} />
              <View style={styles.characterInfo}>
                <Text style={styles.characterName}>{item.name}</Text>
                <Text style={styles.characterSpecies}>{item.species}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Filter Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filters</Text>

            <Text>Status:</Text>
            <Picker
              selectedValue={selectedStatus}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedStatus(itemValue)}
            >
              <Picker.Item label="All" value="" />
              <Picker.Item label="Alive" value="Alive" />
              <Picker.Item label="Dead" value="Dead" />
              <Picker.Item label="Unknown" value="unknown" />
            </Picker>

            <Text>Species:</Text>
            <Picker
              selectedValue={selectedSpecies}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedSpecies(itemValue)}
            >
              <Picker.Item label="All" value="" />
              <Picker.Item label="Human" value="Human" />
              <Picker.Item label="Alien" value="Alien" />
              <Picker.Item label="Myth" value="Myth" />
            </Picker>

            <Text>Gender:</Text>
            <Picker
              selectedValue={selectedGender}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedGender(itemValue)}
            >
              <Picker.Item label="All" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Genderless" value="Genderless" />
            </Picker>

            <Button title="Apply Filters" onPress={applyFilters} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  characterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  characterInfo: {
    flexDirection: 'column',
  },
  characterName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  characterSpecies: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
});

export default CharacterListScreen;