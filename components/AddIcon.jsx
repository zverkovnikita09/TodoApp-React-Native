import React, {useRef} from "react";
import {Animated, View, Pressable} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

export default function AddIcon({openModal}){
    const addPressAnim = useRef(new Animated.Value(1)).current;

    const addPressAnimIn = () => {
        Animated.timing(addPressAnim, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true
        }).start();
      };
    
      const addPressAnimOut = () => {
        Animated.timing(addPressAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true
        }).start();
      };

    return (
        <Pressable style={{marginTop: 20}} onPress={openModal} onPressIn={addPressAnimIn} onPressOut={addPressAnimOut}>
            <Animated.View style={{transform: [{scale: addPressAnim}]}}>
                <MaterialIcons name='add' size={50} style={{textAlign:"center"}}/>
            </Animated.View>
        </Pressable>
    )
}