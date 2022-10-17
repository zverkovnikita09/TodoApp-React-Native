import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity} from 'react-native';
import ListItem from './components/ListItem';
import AddFrom from './components/AddForm';
import {MaterialIcons} from '@expo/vector-icons';

export default function App() {
  const [modal, setModal] = useState(false)
  const [id, setId] = useState(2);

  const [tasks, setTasks] = useState([
    {text: 'to do smth', key: 1, done: false},
  ])

  const onDone =(key)=>{
    const idx = tasks.findIndex(el=>el.key===key);
    const itemUpd = {...tasks[idx], done: true};
    const tasksUpd = [...tasks.slice(0,idx), itemUpd, ...tasks.slice(idx+1)];
    setTasks(tasksUpd);
  }

  const AddTask = (text)=>{
    const newTask = {
      text: text,
      key: id,
      done: false
    }
    setId(prev=>++prev);
    const tasksUpd = [...tasks, newTask];
    setTasks(tasksUpd);
  }
  const CloseModal =()=>{
    setModal(false);
  }

  return (
    <View style={styles.container}>
      <Modal visible={modal} animationType='fade' transparent={true}>
          <AddFrom closeModal={CloseModal} AddTask={AddTask}/>
      </Modal>

      <Text style={styles.title}>Todo app</Text>

      <TouchableOpacity style={{marginTop: 20}} onPress={()=>setModal(true)}>
        <MaterialIcons name='add' size={50} style={{textAlign:"center"}}/>
      </TouchableOpacity>

      <View style={styles.listWrapper}>
        <FlatList style={styles.list} data={tasks} renderItem={({item})=>(
          <ListItem el={item} onDone={onDone}/>
        )}/>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  title: {
    marginTop: 20,
    fontSize: 40,
  },
  listWrapper: {
    marginTop: 10,
    width: '90%',
    flex: 1
  },
});
