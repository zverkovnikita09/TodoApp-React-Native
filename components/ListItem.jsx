import React, {useRef} from 'react';
import {Animated, StyleSheet, Text, View, TouchableOpacity, Pressable} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

export default function ListItem ({el,onDone}){
    const {text, done, key} = el;
    const pressAnim = useRef(new Animated.Value(1)).current;

    const pressAnimIn = () => {
        Animated.timing(pressAnim, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true
        }).start();
      };
    
      const pressAnimOut = () => {
        Animated.timing(pressAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true
        }).start();
      };

    return(
        <Pressable onPressIn={pressAnimIn} onPressOut={pressAnimOut} onPress={()=>onDone(key)} disabled={done}>
            <Animated.View style={[{transform: [{scale: pressAnim}]},style.itemContainer]}>
                <Text style={[style.task, {textDecorationLine: done ? 'line-through' : 'none'}]}>{text}</Text>
                <View style={style.buttons}>
                    <TouchableOpacity style={style.edit}>
                        <MaterialIcons
                            name='edit'
                            size={20}
                            style={{textAlign:"center"}}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.done, {borderColor: done ? 'transparent' : 'black'}]} onPress={()=>{onDone(key)}}>
                        {!done ? null :
                        (<MaterialIcons name='done' size={30} style={{textAlign:"center",marginTop: -3, color: 'green'}}/>)}
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </Pressable>
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