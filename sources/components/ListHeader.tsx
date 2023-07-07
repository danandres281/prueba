import { View, Text } from 'react-native'
import React from 'react'

const ListHeader = () => {
  return (
    <View style = {{marginBottom: 10}}>
      <Text style= {{fontSize:20, fontWeight:'bold'}}>Mis tareas</Text>
    </View>
  )
}

export default ListHeader