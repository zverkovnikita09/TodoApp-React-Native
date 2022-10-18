import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback} from 'react-native';

export default function AddFrom ({closeModal,AddTask}){
    const [text, setText] = useState('');

    const onConfirm =()=>{
        if(text){
            AddTask(text);
            closeModal();
        }
        else return;
    }

    return(
        <TouchableWithoutFeedback onPress={closeModal}>
            <View style={style.inputOverlay}>
                <TouchableWithoutFeedback>
                    <View style={style.inputWrapper}>
                        <Text style={{fontSize: 22, textAlign: 'center'}}>Add new task</Text>
                        <TextInput onChangeText={setText} placeholder="type your task" style={style.input} autoFocus={true} multiline={true}/>
                        <TouchableOpacity onPress={onConfirm} style={style.addBtn}>
                            <Text style={style.btnText}>Add Task</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    )
}

const style = StyleSheet.create({
    inputOverlay: {
        marginHorizontal: 'auto',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(52, 52, 52, 0.8)'
    },
    inputWrapper:{
        backgroundColor: 'white',
        padding: 25,
        width: '90%',
        borderRadius: 15
    },
    input: {
        fontSize: 18,
        padding: 10,
        marginTop: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    addBtn: {
        width: '100%',
        marginTop: 20,
        backgroundColor: 'blue',
        borderRadius: 7,
        padding: 10
    },
    btnText: {
        fontSize: 22, 
        color: 'white', 
        textAlign: 'center',
    }
})
