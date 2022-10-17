import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

export default function ListItem ({el,onDone}){
    const {text, done, key} = el;
    return(
        <TouchableOpacity style={style.itemContainer} onPress={()=>{onDone(key)}}>
            <Text style={[style.task, {textDecorationLine: done ? 'line-through' : 'none'}]}>{text}</Text>
            <View style={style.buttons}>
                <TouchableOpacity style={style.edit}>
                    <MaterialIcons
                        name='edit'
                        size={20}
                        style={{textAlign:"center"}}
                        />
                </TouchableOpacity>
                <TouchableOpacity style={[style.done, {borderColor: done ? 'transparent' : 'black'}]} onPress={()=>{onDone(key)}} disabled={!done}>
                    {!done ? null :
                    (<MaterialIcons name='done' size={30} style={{textAlign:"center",marginTop: -3, color: 'green'}}/>)}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
};

const style = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        marginVertical: 5,
    },
    task: {
        fontSize: 18,
        flex: 1
    },
    done: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'center'
    },
    buttons: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    edit: {
        width: 30,
        height: 30,
        marginRight: 10,
        justifyContent: 'center'
    }
});