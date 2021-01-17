import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Text, TextProps} from './Themed';
import Subscription from './Subscription';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Player from './Player';

export default function Feeds() {
  const [subscriptions, setSubscriptions] = React.useState([]);

  React.useEffect(() => {
    AsyncStorage.getItem(`@subscriptions`).then(value => {
      if (value) {
        console.log(value);
        setSubscriptions(JSON.parse(value));
      }
    });
  }, []);

  React.useEffect(() => {
    console.log(subscriptions);
  }, [subscriptions]);
  return (
    <ScrollView style={styles.root}>
      {subscriptions !== [] ? (
        Object.values(subscriptions)
          .slice(0, 10)
          .map((subscription: any) => (
            <Subscription key={subscription.id} subscription={subscription} />
          ))
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
