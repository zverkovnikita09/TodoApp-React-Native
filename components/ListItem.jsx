import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity, Pressable} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

export default function ListItem({ el, onDone, deleteTask}) {
    const { text, done, key } = el;
    const pressAnim = useRef(new Animated.Value(1)).current;
    const deleteAnimVal = useRef(new Animated.Value(0)).current;
    const [overlay, setOverlay] = useState(false);

    const pressAnimIn = (arg) => {
        Animated.timing(arg, {
            toValue: 0.9,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    const pressAnimOut = (arg) => {
        Animated.timing(arg, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true
        }).start();
    };

    const onDeleteAnim = (key)=>{
        setOverlay(false);
        Animated.timing(deleteAnimVal, {
            toValue: 100,
            duration: 350,
            useNativeDriver: true
        }).start(()=>deleteTask(key));

    }
    const longPress =()=>{
        setOverlay(true);
    }

    const onDeleteTranslate = deleteAnimVal.interpolate({inputRange: [0, 100], outputRange: [0, -350]})
    const onDeleteOpacity = deleteAnimVal.interpolate({inputRange: [0, 70], outputRange: [1, 0]})
    
    return (
        <Pressable onPressIn={()=>pressAnimIn(pressAnim)} onPressOut={()=>pressAnimOut(pressAnim)} onPress={() => onDone(key)} disabled={overlay} onLongPress={longPress}>
            <Animated.View style={{ transform: [{ scale: pressAnim }] }}>
                
                <View style={[style.overlay,{display: overlay ? 'flex' : 'none'}]}>
                    <Pressable onPress={()=>onDeleteAnim(key)}>
                        <AntDesign
                        name='delete'
                        size={30}
                        style={{ textAlign: "center"}}
                        color='white'
                        />
                    </Pressable>
                </View>

                <Animated.View style={[style.itemContainer,{transform: [{translateX: onDeleteTranslate}], opacity: onDeleteOpacity}]}>
                    <View style={style.done}>
                        {!done ? null :
                            (<MaterialIcons name='done' size={30} style={{ textAlign: "center", marginTop: -3, color: 'green' }} />)}
                    </View>

                    <View style={[{ marginLeft: done ? 0 : 10 }, style.inner]}>
                        <Text style={[style.task, { textDecorationLine: done ? 'line-through' : 'none' }]}>{text}</Text>
                        <TouchableOpacity style={style.edit}>
                            <MaterialIcons
                                name='edit'
                                size={20}
                                style={{ textAlign: "center" }}
                            />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Animated.View>
        </Pressable>
    )
};

const style = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
    },
    inner: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    overlay:{
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(255, 0, 0, 0.9)',
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        zIndex: 2
    },
    task: {
        fontSize: 18,
        flex: 1
    },
    done: {
        justifyContent: 'center',
    },
    edit: {
        width: 30,
        height: 30,
        justifyContent: 'center'
    }
});