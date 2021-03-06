import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Image,
  View,
  Button,
  ScrollView,
} from 'react-native';
import {Text, TextProps} from './Themed';
import Episode from './Episode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Player from './Player';

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

const refeshFeedEpisodes = async () => {
  const url = `http://192.168.1.108:3000/getFeedEpisodes`;
  try {
    const subs = await getMyObject('subscriptions');
    console.log(subs);
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
    console.log(json);
  } catch (error) {
    console.error(error);
  }
};

refeshFeedEpisodes();

export default function Feeds() {
  const [episodes, setEpisodes] = React.useState([]);

  React.useEffect(() => {
    AsyncStorage.getItem(`@episodes`).then(value => {
      if (value) {
        setEpisodes(JSON.parse(value));
      } else {
        refeshFeedEpisodes();
      }
    });
  }, []);
  React.useEffect(() => {}, [episodes]);

  return (
    <ScrollView style={styles.root}>
      <Button
        onPress={() => refeshFeedEpisodes()}
        title="refresh"
        color="#d8baba"
      />
      {episodes !== [] ? (
        episodes
          .slice(0, 10)
          .map((episode: any) => <Episode key={episode.id} episode={episode} />)
      ) : (
        <Text>no subs</Text>
      )}
    </ScrollView>
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
