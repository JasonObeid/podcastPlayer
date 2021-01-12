import * as React from 'react';
import {useState} from 'react';
import {TextInput, StyleSheet, Image, View} from 'react-native';
import SearchResult from './SearchResult';

export default function Search() {
  const [text, setText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const logo = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    width: 64,
    height: 64,
  };

  const getSearchResults = async (searchText: string) => {
    const url = `http://192.168.1.108:3000/searchByTerm/${searchText}`;
    try {
      let response = await fetch(url, {mode: 'cors'});
      console.log(response);
      let json = await response.json();
      setSearchResults(json.feeds);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.root}>
      <TextInput
        inlineImageLeft="search_icon"
        returnKeyType="search"
        style={{height: 40}}
        placeholder="Search for Podcasts"
        onChangeText={(text: React.SetStateAction<string>) => setText(text)}
        defaultValue={text}
        onSubmitEditing={event => getSearchResults(event.nativeEvent.text)}
      />
      {searchResults.length > 0 ? (
        <View style={styles.container}>
          {searchResults.map((searchResult: any) => (
            <SearchResult key={searchResult.id} podcast={searchResult} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'powderblue',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  root: {
    margin: 20,
  },
});
