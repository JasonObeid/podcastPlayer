import * as React from 'react';
import {useEffect, useState} from 'react';
import {TextInput, StyleSheet, Image, View, Button} from 'react-native';
import {Text, TextProps} from './Themed';
import Episode from './Episode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getMyObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}`);
    console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
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

const refeshSubscriptionEpisodes = async () => {
  const url = `http://192.168.1.108:3000/getSubscriptionEpisodes`;
  try {
    const subs = await getMyObject('subscriptions');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subs),
      mode: 'cors',
    });
    const json = await response.json();
    setObjectValue('episodes', json);
  } catch (error) {
    console.error(error);
  }
};

const renderEpisodes = async () => {
  const episodes = await getMyObject('episodes');
  console.log(episodes);
  return;
};

refeshSubscriptionEpisodes();

export default function Subscriptions() {
  const [episodes, setEpisodes] = React.useState([]);

  React.useEffect(() => {
    AsyncStorage.getItem(`@episodes`).then(value => {
      if (value) {
        setEpisodes(JSON.parse(value));
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      {episodes !== undefined ? (
        episodes.map((episode: any) => (
          <Episode key={episode.id} episode={episode} />
        ))
      ) : (
        <Text>test</Text>
      )}
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
  root: {
    margin: 20,
  },
});
