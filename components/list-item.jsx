import React from "react";
import { StyleSheet, Text, View, Button} from 'react-native';

export const ListItem = (props)=>{
    const {id, done, task} = props;
    return (<View>
        <Text>{task}</Text>
        <Button/>
        </View>)
}