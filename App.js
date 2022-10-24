import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {StyleSheet, Text, View, FlatList, Modal, TouchableOpacity} from 'react-native';
import ListItem from './components/ListItem';
import AddFrom from './components/AddForm';
import AddIcon from './components/AddIcon'

export default function App() {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(6);
  const [Done, setDone] = useState(false);
  const [LeftToDo, setLeftToDo] = useState(false);

  const [tasks, setTasks] = useState([
    {text: 'to do smth1', key: 1, done: false},
    {text: 'to do smth2', key: 2, done: false},
    {text: 'to do smth3', key: 3, done: false},
    {text: 'to do smth4', key: 4, done: false}
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
  
  const onlyDone =()=>{
    return tasks.filter(el=>el.done===true)
  }

  const onlyLeft =()=>{
    return tasks.filter(el=>el.done===false)
  }

  return (
    <View style={styles.container}>
        <Modal visible={modal} animationType='fade' transparent={true}>
            <AddFrom closeModal={CloseModal} AddTask={AddTask}/>
        </Modal>

        <Text style={styles.title}>Todo app</Text>

        <View style={styles.buttons}>
            <TouchableOpacity onPress={()=>{
              if(Done){
                setDone(false)
              }
              else{
                setLeftToDo(false)
                setDone(true)
              }
              }
            }
            style={[styles.button, {borderBottomColor: Done ? 'rgba(36, 187, 221, 0.95)' : 'transparent'}]}>
              <Text style={{fontSize:18, 
                color: Done ? 'rgba(36, 187, 221, 0.95)':'rgba(52, 52, 52, 0.5)',
                }}>Completed</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
              if(LeftToDo){
                setLeftToDo(false)
              }
              else{
                setDone(false)
                setLeftToDo(true)
              }
              }} 
              style={[styles.button,{ marginLeft: 15, borderBottomColor: LeftToDo ? 'rgba(36, 187, 221, 0.95)' : 'transparent'}]}>
              <Text style={{fontSize:18, color: LeftToDo ? 'rgba(36, 187, 221, 0.95)' : 'rgba(52, 52, 52, 0.5)'}}>Left to do</Text>
            </TouchableOpacity>
          </View>

        <View style={styles.listWrapper}>
          <FlatList 
          style={styles.list} 
          data={Done ? onlyDone() : LeftToDo ? onlyLeft() : tasks} 
          renderItem={({item})=>(<ListItem el={item} onDone={onDone} deleteTask={DeleteTask} editTask={EditTask}/>)}
          ItemSeparatorComponent={() => <View style={{height: 10}}/>}
          />
        </View>
          <AddIcon openModal={()=>setModal(true)}/>
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%'
  },
  button: {
    width: 120,
    paddingVertical: 5, 
    paddingHorizontal: 5,
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 5
  }
});
