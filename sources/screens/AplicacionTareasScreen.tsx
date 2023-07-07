/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import {Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import TaskItem from '../components/TaskItem';
import ListHeader from '../components/ListHeader';
import CountDown from 'react-native-countdown-component';
import * as Notifications from 'expo-notifications';
const screenHeight = Dimensions.get("screen").height 

export const AplicacionTareasScreen = () => {
  const [task,setTask] = useState('')  //se declara un estado para el manejo de las tareas
  const [addNew, setAddNew] = useState(false); //Creo un nuevo estado para gestionar cuando se va a crear una nueva tarea o no, por defecto se encuentra en false para que no se muestren los componentes inicialmente
  const [tasks, setTasks] = useState(['Programar App'])

  const addTask = () =>{   //Se creo una funcion flecha para agregar las tareas al arreglo
    setTasks(currentTasks => [...currentTasks, task])  //Se crea una variable temporal de las tareas actuales y se crea un nuevo arreglo con todas las tareas y se agreñade la tarea actual
            setTask('')  //limpia la tarea
            setAddNew(false)  //Oculta el input al añadir una nueva tarea                                   
  }
  const deleteTask = (index) =>{  //Creo una funcion flecha para eliminar las tareas de la lista
    let temp = [...tasks]   //Creo un arreglo temporal copiando los elementos del arreglo tasks
    temp.splice(index, 1)   //Utilizo la funcion splice que elimina el elemento del arreglo en la posicion del index
    setTasks(temp)   //Actualizo  el estado de tasks con el arreglo con el elemento eliminado
  }
  return (
    <SafeAreaView style = {{marginHorizontal: 20}}>
      <View style = {styles.countDown}>
        <CountDown   //Se utiliza el componente SafeAreaView para asegurar que el contenido de la app se muestre correctamente en los limites de la pantalla
        size={20}    //Se importa y se utiliza el compnente de countdown para crear la cuenta regresiva configurando el tiempo que inicia en 15 minutos con un tamaño de 20
        until={900}
        onChange={scheduleCountDownNotificaction} //Al cambiar la cuenta regresiva se llama la funcion para lanzar la notificacion al faltar 5 minutos
        />

      </View>


      {
        addNew && (
          <><View>
            <TextInput    //Se crea el formulario para escribir la tarea
              onChangeText={setTask}   //Al cambiar el valor se le asigna la variable setTask
              placeholder='Agregar nueva tarea'
              style={styles.input}  //En el value se recibe como valor la tarea declarada anteriormente que se digita en el textInput
              value={task} /> 

          </View><View style={{ marginVertical: 10, flexDirection: 'row', }}>
              <TouchableOpacity  //Utilizamos el componente de TouchableOpacity para indicar que es un componente que se puede oprimir
                style={[styles.button, styles.acceptButton]}
                onPress={addTask}
              >
                <Text style={styles.buttonText}>Agregar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setAddNew(false)}  //Al oprimir el boton de cancelar vuelve el estado de la variable a false para que no se muestre los componentes
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View></>

        )
      }
      <View>
        <FlatList //Utilizo el componente de FlatList para mostrar la lista de tareas de la aplicacion
        data={tasks}  //Indico la informacion que contendra la lista que es el arreglo de tareas utilizando la prop data
        keyExtractor={(item) => item}  //se utiliza el item que es la propia tarea como llave unica  en cada elemento de la lista
        renderItem={({item, index}) => <TaskItem task = {item} onPress={() => deleteTask(index)} />} //Cree un componente llamado TaskItem que es la tarea especifica y se rendriza  cada elemento de la lista y al presionar el elemto se elimina la tarea correspondiente con el prop onPress utilizando la funcion deleteTask 
        ListHeaderComponent={() =><ListHeader/>}
        />
      </View>
      
    <View style={styles.addButtonPosition}>
        <TouchableOpacity 
        style={styles.addButton} //Al precionar el boton se cambio el estado de la variable a true para que se muestre los componentes para agregar una nueva tarea  
        onPress={() => setAddNew(true)} //Se utilizo un funcion flecha para evitar que se itere infinitamente la variable de setAddnew al pasarle el parametro
        
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
    
  )
}
const styles = StyleSheet.create({

  acceptButton:{
    backgroundColor: 'green'
  },

  addButton:{
    alignItems: 'center',
    backgroundColor: '#59B10F',
    borderRadius: 30,
    height: 70,
    justifyContent: 'center',
    width: 70
  },
  addButtonText:{
    color: 'white',
    fontSize: 25,
  },
  addButtonPosition:{
    right: 10,
    top: screenHeight - 160,
    position: 'absolute',   
  },
  button:{
    alignSelf: 'flex-start',
    borderRadius:10,
    padding: 10

  },
  buttonText:{
    color: 'white',
    fontSize: 15,
  },
  cancelButton: {
    backgroundColor: 'red',
    marginLeft: 5,
  },
  countDown: {
    padding: 50
  },
  input: {
    backgroundColor: '#dedede',
    borderRadius: 10,
    padding: 10
  }
})
const scheduleCountDownNotificaction = async (valueTime) =>{  //Importando el componente de Expo para el manejo de notificacion creo la siguiente funcion para lanzar la notificacion
  const minutos = 5 * 60;  //Como se encuentra en segundo el metodo se pasas a 5 minutos realizando el calculo
  const actualValue = valueTime / 1000;  //Se divide entre 1000 para pasarlo a milisegundos
  if (actualValue <= minutos) {    //Se valida que la cuenta sea de 5 minutos o menos y si es asi lanza la notificacion
    const notificationTime = Date.now() + (minutos - actualValue) * 1000;

    await Notifications.scheduleNotificationAsync({  //Se utiliza la siguiente funcion asincrona que tiene el componente de Notifications de Expo para programar la notificacion
      content: {  //Se establece el contenido de la notificacion
        title: 'Se acaba el tiempo',
        body: 'Quedan 5 minutos'
      },
      trigger: {   //Se define el trigger que activa la notificacion
        date: new Date(notificationTime), //Se crea un objeto Date que especifica el tiempo especificado donde se lanzara la notifciacion
      }
    })
  }


}


