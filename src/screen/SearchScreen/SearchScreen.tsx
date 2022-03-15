import {useDebounce} from '@react-hook/debounce';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Searchbar} from 'react-native-paper';

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const navigation = useNavigation<any>();

  const updateSearch = () => {
    console.log('Searching value', search);
    navigation.navigate('ItemScreen');
  };
  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearch}
        value={search}
        autoCompleteType={false}
        onIconPress={updateSearch}
        style={{marginTop: 5, borderRadius: 10}}
      />
    </View>
  );
}
