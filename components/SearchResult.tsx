import * as React from 'react';
import {useState} from 'react';
import {Text, StyleSheet, Image, View, Button, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const getImage = async (uri: string) => {
//   const url = `http://192.168.1.108:3000/img/${uri}`;
//   try {
//     let response = await fetch(url);
//     console.log(response);
//     let json = await response.json();
//     const image = {
//       uri: json.uri,
//       width: 64,
//       height: 64,
//     };
//     return image;
//   } catch (error) {
//     console.error(error);
//   }
// };

// function getImageURI(artworkURI: string, imageURI: string) {
//   let uri = "";
//   if (artworkURI !== "" && artworkURI !== null) {
//     uri = artworkURI;
//   } else if (imageURI !== "" && imageURI !== null) {
//     uri = imageURI;
//   }
//   getImage(uri);
// }
function getImage(artworkURI: string, imageURI: string) {
  let uri = '';
  if (imageURI !== '' && imageURI !== null) {
    uri = imageURI;
  } else if (artworkURI !== '' && artworkURI !== null) {
    uri = artworkURI;
  }
  const image = {
    uri: uri,
    width: 64,
    height: 64,
  };
  return image;
}

function checkIfExists(subs, podId) {
  subs.forEach(function(sub) {
    if (sub.id === podId) {
      return true;
    }
  });
  return false;
}

const onPressButton = async (podcast: any) => {
  let subs = await getMyObject('subscriptions');
  console.log(podcast);
  console.log(subs);
  if (subs === null) {
    subs = [];
  }
  const alreadySubbed = checkIfExists(subs, podcast.id);
  console.log(!alreadySubbed);
  if (!alreadySubbed) {
    subs.push(podcast);
    await setObjectValue('subscriptions', subs);
  }
};

const setObjectValue = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@${key}`, jsonValue);
    console.log(value);
  } catch (e) {
    console.log(e);
  }
};

const getMyObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}`);
    const value = JSON.parse(jsonValue);
    console.log(value);
    return value !== null ? value : null;
  } catch (e) {
    console.log(e);
  }
};

export default function SearchResult(props: {podcast: any}) {
  return (
    <View style={styles.row}>
      <Image source={getImage(props.podcast.artwork, props.podcast.image)} />
      <View style={styles.container}>
        <Text numberOfLines={1}>{props.podcast.title}</Text>
        <Text numberOfLines={1}>{props.podcast.author}</Text>
        <Text numberOfLines={1}>{props.podcast.description}</Text>
      </View>
      <Button
        onPress={async () => onPressButton(props.podcast)}
        title="ADD THIS"
        color="#000000"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'powderblue',
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
