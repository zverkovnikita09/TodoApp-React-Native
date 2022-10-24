import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity, Pressable, Modal} from 'react-native';
import { MaterialIcons, AntDesign, MaterialCommunityIcons  } from '@expo/vector-icons';
import EditTask from './EditTask';

export default function ListItem({ el, onDone, deleteTask, editTask}) {
    const offset = 79;
    const [cancel,setCancel] = useState(true)
    const {done, key, text } = el;
    const [modal, setModal] = useState(false);
    const pressAnim = useRef(new Animated.Value(1)).current;
    const deleteAnimVal = useRef(new Animated.Value(0)).current;
    const [overlay, setOverlay] = useState(false);

    const pressAnimIn = (arg) => {
        Animated.timing(arg, {
            toValue: 0.95,
            duration: 150,
            useNativeDriver: true
        }).start();
    };

    const pressAnimOut = (arg) => {
        Animated.timing(arg, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start();
    };

    const onDeleteAnim = (key)=>{
        setCancel(false)
        Animated.timing(deleteAnimVal, {
            toValue: -350,
            duration: 70,
            useNativeDriver: true
        }).start(()=>deleteTask(key));

    }
    const longPress =()=>{
        setOverlay(true)
        Animated.timing(deleteAnimVal, {
            toValue: -offset,
            duration: 50,
            useNativeDriver: true
        }).start()
    }
    const cancelAnim =()=>{
        setOverlay(false)
        Animated.timing(deleteAnimVal, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true
        }).start()
    }

    const newText = (text)=>{
        editTask(text,key)
    }
    
    return (
        <>
        <Modal visible={modal} animationType='fade' transparent={true}>
            <EditTask text={text} closeModal={()=>setModal(false)} newText={newText}/>
        </Modal>

        <Pressable onPressIn={()=>pressAnimIn(pressAnim)} onPressOut={()=>pressAnimOut(pressAnim)} onPress={() => onDone(key)} disabled={overlay} onLongPress={longPress} delayLongPress={300}>
            <Animated.View style={{ transform: [{ scale: pressAnim }] }}>
                <Animated.View style={[style.overlay,{display: overlay ? 'flex' : 'none', transform: [{translateX: deleteAnimVal}]}]}>
                    <Pressable onPress={()=>onDeleteAnim(key)}>
                        <AntDesign
                        name='delete'
                        size={30}
                        style={{ textAlign: "center", transform: [{translateX: offset/2}]}}
                        color='white'
                        />
                    </Pressable>
                </Animated.View>

                <View style={[style.cancel, {display: cancel ? 'flex' : 'none'}]}>
                    <Pressable onPress={cancelAnim}>
                        <MaterialCommunityIcons
                        name='cancel'
                        size={30}
                        style={{ textAlign: "center"}}
                        color='white'
                        />
                    </Pressable>
                </View>

                <Animated.View style={[style.itemContainer,{transform: [{translateX: deleteAnimVal}],
                    borderWidth: done ? 2 : 1,
                    borderColor: done ? 'green' : 'black'}]}>

                    <View style={style.inner}>
                        <Text style={[style.task, { textDecorationLine: done ? 'line-through' : 'none' }]}>{text}</Text>
                        <TouchableOpacity style={[style.edit,{display: done? 'none' : 'flex'}]} onPress={()=>setModal(true)} disabled={done}>
                            <MaterialIcons
                                name='edit'
                                size={20}
                                style={{ textAlign: "center" ,opacity: overlay? 0 : 1}}
                            />
                        </TouchableOpacity>
                        <View style={style.done}>
                        {(!done) ? null :
                            (<MaterialIcons name='done' size={25} style={[style.doneBtn,{opacity: overlay? 0 : 1}]}/>)}
                        </View>
                    </View>
                </Animated.View>
            </Animated.View>
        </Pressable>
        </>
    )
};

const style = StyleSheet.create({
    itemContainer: {
        position: 'relative',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 10,
        zIndex: 1,
        borderRadius: 5,
    },
    inner: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    overlay:{
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(255, 0, 0, 0.85)',
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2
    },
    cancel: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: 80,
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        borderTopStartRadius: 7,
        borderBottomStartRadius: 7,
        transform: [
            {scaleX: -1}
        ],
        zIndex: -1
    },
    task: {
        fontSize: 18,
        flex: 1
    },
    done: {
        justifyContent: 'center',
    },
    doneBtn:{
        textAlign: "center",
        paddingTop: 1.5,
        paddingRight: 1.5,
        color: 'green', 
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 50
    },
    edit: {
        width: 30,
        height: 30,
        justifyContent: 'center'
    }
});