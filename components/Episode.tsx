import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, Image, View, Button} from 'react-native';
import {Text, TextProps} from './Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

function getImage(imageURI: string, feedImageURI: string) {
  let uri = '';
  if (imageURI !== '' && imageURI !== null) {
    uri = imageURI;
  } else if (feedImageURI !== '' && feedImageURI !== null) {
    uri = feedImageURI;
  }
  const image = {
    uri: uri,
    width: 64,
    height: 64,
  };
  return image;
}

const setObjectValue = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@${key}`, jsonValue);
    console.log(AsyncStorage.setItem(key, jsonValue));
  } catch (e) {
    console.log(e);
  }
};

const getMyObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}`);
    console.log(await AsyncStorage.getItem(`@${key}`));
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export default function Episode(props: {episode: any}) {
  return (
    <View style={styles.row}>
      <Image source={getImage(props.episode.image, props.episode.feedImage)} />
      <View style={styles.container}>
        <Text numberOfLines={1}>{props.episode.title}</Text>
        <Text numberOfLines={2}>{props.episode.description}</Text>
        <Text numberOfLines={1}>{props.episode.datePublishedPretty}</Text>
      </View>
      <Button
        onPress={() => console.log('dl')}
        title="download"
        color="#d8baba"
      />
      <Button
        onPress={() => getImage(props.episode.image, props.episode.feedImage)}
        title="play"
        color="#d8baba"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 80,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'powderblue',
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
