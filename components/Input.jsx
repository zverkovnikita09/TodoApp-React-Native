import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

export const Input = ()=>{
    const [value, setValue] = React.useState('');

    return (
        <View style={{width: '100%'}}>
            <TextInput
            placeholder='type your task...'
            onChangeText={setValue}
            value={value}
            style={styles.input}
            />
            <TouchableOpacity>
                <MaterialIcons
                name='add'
                size={50}
                style={{textAlign:"center", marginTop: 20}}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        color: 'black',
        fontSize: 20,
        marginTop: 12,
        borderBottomWidth: 1,
        padding: 5,
        width: '100%'
      }
})