import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Input } from './components/Input';
import { List } from './components/list-item';

export default function App() {
  const [state, setState] = React.useState([
    {task: 'to do smth', done: false, id: 1},
    {task: 'to do smth', done: false, id: 2},
    {task: 'to do smth', done: false, id: 3}
  ])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo app</Text>
      <Input/>
      <List items={state}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  title: {
    fontSize: 40,
  },
});
