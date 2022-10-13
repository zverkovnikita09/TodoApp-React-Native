import React from "react";
import { StyleSheet, Text, View} from 'react-native';
import { ListItem } from "./list-item";

export const List = ({items})=>{
    const elements = items.map(el=>{
        return <ListItem id={el.id} task={el.task}/>
    })
    return <View>{elements}</View>
}