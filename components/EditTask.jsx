import React,{useState} from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, TextInput} from 'react-native';
import { MaterialIcons, Feather  } from '@expo/vector-icons';


export default function EditTask({text, closeModal, newText}){
    const [actualText, setActualText] = useState(text);
    return(
        <TouchableWithoutFeedback onPress={closeModal}>
            <View style={style.overlay}>
                <TouchableWithoutFeedback>
                    <View style={style.inputWrapper}>
                        <Text style={{fontSize: 22, textAlign: 'center'}}>Edit</Text>
                        <TextInput style={style.input} value={actualText} autoFocus={true} onTextInput={setActualText} multiline={true}/>
                        
                        <View style={style.buttons}>
                            <TouchableOpacity activeOpacity={0.5} style={style.accept} onPress={()=>{
                                return actualText ? newText(actualText) : null
                                }}>
                                <MaterialIcons name="done" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.5} style={style.cancel}>
                                <Feather name="x" size={24} color="white"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback> 
    )
}

const style = StyleSheet.create({
    overlay: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor:'rgba(52, 52, 52, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
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
    buttons:{
        flexDirection: 'row',
    },
    accept: {
        flex: 1,
        marginTop: 20,
        backgroundColor: 'green',
        borderRadius: 7,
        padding: 10,
        marginRight: 30,
        alignItems: 'center'
    },
    cancel: {
        flex: 1,
        marginTop: 20,
        backgroundColor: 'red',
        borderRadius: 7,
        padding: 10,
        alignItems: 'center'
    }
})