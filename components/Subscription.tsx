import * as React from 'react';
import {useState} from 'react';
import {Text, StyleSheet, Image, View, Button, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const onPressButton = async (feedId: string) => {
  alert(feedId);
};

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

export default function Subscription(props: {subscription: any}) {
  return (
    <View style={styles.row}>
      <Image
        source={getImage(props.subscription.artwork, props.subscription.image)}
      />
      <View style={styles.container}>
        <Text numberOfLines={1}>{props.subscription.title}</Text>
        <Text numberOfLines={1}>{props.subscription.author}</Text>
        <Text numberOfLines={1}>{props.subscription.description}</Text>
      </View>
      <Button
        onPress={async () => {
          onPressButton(props.subscription.id);
        }}
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
