import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {StyleSheet, Text, View, FlatList, Modal} from 'react-native';
import ListItem from './components/ListItem';
import AddFrom from './components/AddForm';
import AddIcon from './components/AddIcon'

export default function App() {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(6);

  const [tasks, setTasks] = useState([
    {text: 'to do smth1', key: 1, done: false},
    {text: 'to do smth2', key: 2, done: false},
    {text: 'to do smth3', key: 3, done: false},
    {text: 'to do smth4', key: 4, done: false},
    {text: 'to do smth5 to do smth5 to do smth5 to do smth5to do smth5 to do smth5 to do smth5 to do smth5 to do smth5to do smth5', key: 5, done: false},
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

  const DeleteTask = (key)=>{
    const idx = tasks.findIndex(el=>el.key === key);
    const tasksUpd = [...tasks.slice(0,idx), ...tasks.slice(idx+1)];
    setTasks(tasksUpd);
  }

  const CloseModal =()=>{
    setModal(false);
  }

  const EditTask = (text,key)=>{
    const idx = tasks.findIndex(el=>el.key === key);
    const itemUpd = {...tasks[idx], text};
    const tasksUpd = [...tasks.slice(0,idx), itemUpd, ...tasks.slice(idx+1)];
    setTasks(tasksUpd);
  }
  console.log(tasks)
  return (
    <View style={styles.container}>
        <Modal visible={modal} animationType='fade' transparent={true}>
            <AddFrom closeModal={CloseModal} AddTask={AddTask}/>
        </Modal>

        <Text style={styles.title}>Todo app</Text>

        <AddIcon openModal={()=>setModal(true)}/>

        <View style={styles.listWrapper}>
          <FlatList 
          style={styles.list} 
          data={tasks} 
          renderItem={({item})=>(<ListItem el={item} onDone={onDone} deleteTask={DeleteTask} editTask={EditTask}/>)}
          ItemSeparatorComponent={() => <View style={{height: 10}}/>}
          />
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
    marginTop: 40,
    fontSize: 40,
  },
  listWrapper: {
    marginTop: 10,
    width: '90%',
    flex: 1
  },
});
