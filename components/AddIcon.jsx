import React, {useRef} from "react";
import {Animated, View, Pressable} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

export default function AddIcon({openModal}){
    const addPressAnim = useRef(new Animated.Value(1)).current;

    const addPressAnimIn = () => {
        Animated.timing(addPressAnim, {
          toValue: 0.9,
          duration: 50,
          useNativeDriver: true
        }).start();
      };
    
      const addPressAnimOut = () => {
        Animated.timing(addPressAnim, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true
        }).start();
      };

    return (
        <Pressable style={{marginTop: 10, position: 'absolute', bottom: 10, right: 15}} onPress={openModal} onPressIn={addPressAnimIn} onPressOut={addPressAnimOut}>
            <Animated.View style={{transform: [{scale: addPressAnim}], backgroundColor: 'rgba(36, 187, 221, 0.95)', borderRadius: 50, padding: 20}}>
                <MaterialIcons name='add' size={40} style={{textAlign:"center"}} color='white'/>
            </Animated.View>
        </Pressable>
    )
}