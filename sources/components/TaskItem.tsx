/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react'

const TaskItem = ({onPress, task}) => {
    return (
        <View style = {styles.container}>
            <TouchableOpacity style = {styles.button}
            onPress={onPress}
            />
            <Text style = {styles.text}>{task}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    button:{
        backgroundColor: 'red',
        borderRadius: 15,
        height: 30,
        width: 30

    },
    container: {
        alignItems: 'center',
        backgroundColor: '#188EEA',
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 8,
        padding: 10

    },
    text:{
        color: 'white',
        marginLeft: 10

    }
})

export default TaskItem