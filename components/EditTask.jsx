import React,{useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, TextInput} from 'react-native';
import { MaterialIcons, Feather  } from '@expo/vector-icons';


export default function EditTask({text, closeModal, newText}){
    const [actualText, setActualText] = useState("");

    const updateText =()=>{
        closeModal();
        if(actualText){
            return newText(actualText);
        }
    }

    return(
        <TouchableWithoutFeedback onPress={closeModal}>
            <View style={style.overlay}>
                <TouchableWithoutFeedback>
                    <View style={style.inputWrapper}>
                        <Text style={{fontSize: 22, textAlign: 'center'}}>Edit</Text>
                        <TextInput style={style.input} defaultValue={text} onChangeText={setActualText} multiline={true} autoFocus={true}/>
                        
                        <View style={style.buttons}>
                            <TouchableOpacity activeOpacity={0.5} style={style.accept} onPress={updateText}>
                                <MaterialIcons name="done" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeModal} activeOpacity={0.5} style={style.cancel}>
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
        backgroundColor: 'rgba(12, 157, 87, 0.9)',
        borderRadius: 7,
        padding: 10,
        marginRight: 30,
        alignItems: 'center'
    },
    cancel: {
        flex: 1,
        marginTop: 20,
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        borderRadius: 7,
        padding: 10,
        alignItems: 'center'
    }
})